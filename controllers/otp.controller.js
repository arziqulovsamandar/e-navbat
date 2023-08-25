const { encode, decode } = require("../service/crypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const myJwt = require("../services/JwtService");
const config = require("config");

const DeviceDetector = require("node-device-detector");
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});


function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },

  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const newOTP = async (req, res) => {
  const { phone_number } = req.body;

  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const now = new Date();
  const expiration_time = AddMinutesToDate(now, 3);

  const newOTP = await pool.query(
    `INSERT INTO otp (id, otp, expiration_time) VALUES ($1, $2, $3)RETURNING id;`,
    [uuidv4(), otp, expiration_time]
  );

  const details = {
    timestamp: now,
    check: phone_number,
    success: true,
    message: "OTP sent to user",
    otp_id: newOTP.rows[0].id,
  };

  const encoded = await encode(JSON.stringify(details));
  return res.send({ Status: "Success", Details: encoded });
};

const verifyOTP = async (req, res) => {
  const { verification_key, otp, check } = req.body;
  var currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (err) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }

  var obj = JSON.parse(decoded);
  const check_obj = obj.check;
  console.log(obj);
  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not sent to this particular phone_number",
    };
    return res.status(400).send(response);
  }

  const otpResult = await pool.query(`SELECT * FROM otp WHERE id=$1;`, [
    obj.otp_id,
  ]);
  const result = otpResult.rows[0];
  if (result != null) {
    if (result.verified != true) {
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        if (otp === result.otp) {
          await pool.query(`UPDATE otp SET verified=$2 WHERE id=$1;`, [
            result.id,
            true,
          ]);
          const clientResult = await pool.query(
            `SELECT * FROM client WHERE client_phone_number = $1;`,
            [check]
          );
          let client_id, details;
          if (clientResult.rows.length == 0) {
            const newClient = await pool.query(
              `INSERT INTO client (client_phone_number,otp_id) VALUES ($1,$2) returning id;`,
              [check, obj.otp_id]
            );
            client_id = newClient.rows[0].id;
            details = "new";
          } else {
            client_id = clientResult.rows[0].id;
            details = "old";
            await pool.query(`UPDATE client SET otp_id=$2 WHERE id=$1;`, [
              client_id,
              obj.otp_id,
            ]);
          }
          const payload = {
            id: client_id,
          };
          const tokens = myJwt.generateTokens(payload)
        

          //save refresh token
          const hashed_refresh_token=bcrypt.hashSync(tokens.refreshToken,7);
          const userAgent=req.headers["user-agent"];
        const resUserAgent=detector.detect(userAgent);
        const {os,client,device}=resUserAgent;
        await pool.query(
          `INSERT INTO token(table_name,user_id,user_os,user_device,
            user_browser,hashed_refresh_token) VALUES($1, $2, $3, $4, $5, $6) returning id;`,
            ["client",client_id,os,device,client,hashed_refresh_token]
        ) 
        //set cookie
        res.cookie("refreshToken",tokens.refreshToken,{
          maxAge:config.get("refresh_ms"),
          httpOnly:true,
        });

          const response = {
            Status: "Success",
            Details: details,
            Check: check,
            ClientID: client_id,
            tokens: tokens,
          };
          // const hashed_refresh_token= bcrypt.hashSync(tokens.refreshToken, 8);

          // await pool.query(
          //   `INSERT INTO token (table_name,user_id,hashed_refresh_token) VALUES ($1, $2, $3);`,
          //   ["client",client_id,hashed_refresh_token]
          // )


          return res.status(200).send(response);
        } else {
          const response = { Status: "Failure", Details: "OTP NOT Matched" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Expired" };
        return res.status(400).send(response);
      }
    } else {
      const response = { Status: "Failure", Details: "OTP Already Used" };
      return res.status(400).send(response);
    }
  } else {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
};

const getOTP = async (req, res) => {
  try {
    const otps = await pool.query(`select * from otp ;`);
    console.log(otps);
    res.status(200).json(otps.rows);
  } catch (error) {
    res.status(500).json("otp topilmadi");
  }
};

const deleteOTP = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send({ massage: "invalid id" });
    }
    const idotp = await pool.query(
      `DELETE FROM otp WHERE id = $1 RETURNING id; `,
      [id]
    );
    res.status(500).json(idotp.rows);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getOTPById = async (req, res) => {
  try {
    const id = req.params.id;
    // if (isNaN(id)) {
    //   return res.status(400).send({ massage: "invalid id" });
    // }
    const otp = await pool.query(
      `
        select * from otp where id = $1
        `,
      [id]
    );
    if (otp.rowCount == 0) {
      return res.status(400).send({ massage: "id is not defined" });
    }
    // console.log(client);
    res.status(200).send(otp.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

module.exports = {
  newOTP,
  verifyOTP,
  getOTP,
  deleteOTP,
  getOTPById,
};
