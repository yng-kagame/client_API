
import pool from "../config/db.js";

// CREATE CLIENT
export const createClient = async (req, res) => {
    const { name, sex, address, phone, email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const [existingClient] = await pool.query(
            "SELECT email FROM clients WHERE email = ?",
            [email]
        );

        if (existingClient.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const [result] = await pool.query(
    `INSERT INTO clients
    (name, sex, address, phone, email)
    VALUES (?, ?, ?, ?, ?)`,
    [name, sex, address, phone, email]
);

        res.status(201).json({
            message: "Client created successfully",
            data: {
                id: result.insertId,
                name, sex, address, phone, email
            }
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// GET ALL CLIENTS
export const getAllclients = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM clients"
        );

        res.status(200).json({
            status: "successful",
            message: "Clients retrieved successfully",
            data: result
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

//UPDATE CLIENT BY id 
export const updateClient =async (req,res)=>{
    const { id }=req.params;
    const {name,sex,address,phone,email}=req.body;

    try{
        const[update] =await pool.query(
            'UPDATE clients SET name=? , sex=? ,address=?,phone=?,email=? WHERE id=?',
            [name,sex,address,phone,email,id]
        );

        if(update.affectedRows === 0)
        {
           return res.status(404).json({
            "message":"client Not found"
           })
        }

        res.status(200).json({
            "status":"success",
            "message":"client updated successfully ",
            data:update
        })

    }catch (error) {
        console.log("Error:",error.message)
        res.status(500).json({error:error.message})
    }
}



//GET CLIENT BY ID 
export const getClientById = async (req,res)=>{
    const{id} = req.params

    try{
        const [client]= await pool.query(`SELECT * FROM clients WHERE id=?`,[id]);

        if(client.length==0)
            return res.status(404).json({
        message:`client Not Found`
    })

    else
        res.status(200).json({
    "status":"successfull",
    "message":`client with ${id} retrieved successfully`,
"data":client})

    }catch (error){
        console.log("error:", error.message)
        res.status(500).json({error:error.message})
     }
}

 //DELETE CLIENT BY ID
export const deleteClient= async (req,res)=>{
    const {id} =req.params;
    try{
        const[del] = await pool.query(`DELETE FROM clients WHERE id=?`,[id])
        if(del.affectedRows === 0){
            return res.status(404).json({
                "message":"Client Not Found"
            })
        }
        return res.status(200).json({"message":"Client Deleted successfully"})
    }catch(error){
        console.log("Error:",error.message)

    }
}
