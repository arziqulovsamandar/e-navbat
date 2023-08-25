const pool = require("../config/db");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});

const addClient = async (req, res) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;

    const newClient = await pool.query(
      `INSERT INTO client (client_last_name, client_first_name,
        client_phone_number, client_info, client_photo) VALUES ($1, $2, $3, $4, $5)  returning * ;`,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
      ]
    );
    console.log(newClient);
    res.status(200).json(newClient.rows);
  } catch (error) {
    res.status(500).json(`Server is Error ${error}`);
  }
};

const getClient = async (req, res) => {
  try {
    const userAgent=req.headers["user-agent"];
    console.log(userAgent);
    const result=detector.detect(userAgent);
    console.log("result parse",result);
    console.log(DeviceHelper.isDesktop(result));

    
    const clients = await pool.query(`select * from client ;`);
    // console.log(clients);
    res.status(200).json(clients.rows);
  } catch (error) {
    res.status(500).json("client topilmadi");
  }
};

const updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;
    const newClient = await pool.query(
      `
        UPDATE client set client_last_name=$1 ,client_first_name=$2 ,client_phone_number=$3 ,client_info=$4 ,client_photo=$5
        where id=$6
         RETURNING * ;`,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
        id,
      ]
    );
    console.log(newClient);
    res.status(200).json(newClient.rows);
  } catch (error) {
    res.status(500).json("no update");
  }
};

const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send({ massage: "invalid id" });
    }
    const client = await pool.query(
      `
        select * from client where id = $1
        `,
      [id]
    );
    if (client.rowCount == 0) {
      return res.status(400).send({ massage: "id is not defined" });
    }
    // console.log(client);
    res.status(200).send(client.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

module.exports = {
  addClient,
  getClient,
  updateClient,
  getClientById,
};
