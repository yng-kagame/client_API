
import pool from "../config/db.js";

//CREATE USER
export const createUser = async (req,res)=>{
    const {username,email,password} = req.body;
    try{
        if(!username || !email || !password)
            return res.status(400).json({"message":"All fields are required"});

        const [existingUser] = await pool.query("SELECT email FROM users WHERE email=?",[email]);

        if(existingUser.length > 0)
            return res.status(400).json({"message":"Email already exists"});

        const [result] = await pool.query(
            "INSERT INTO users (username,email,password) VALUES (?,?,?)",
            [username,email,password]
        );

        res.status(201).json({
            "message":"User created successfully",
            "data":{id:result.insertId,username,email}
        });

    }catch(error){
        console.log("Error:",error.message);
        res.status(500).json({error:error.message});
    }
};

//GET ALL USERS
export const getAllUsers = async (req,res)=>{
    try{
        const [result] = await pool.query("SELECT id,username,email FROM users");

        res.status(200).json({
            "status":"successful",
            "message":"Users retrieved successfully",
            "data":result
        });

    }catch(error){
        console.log("Error:",error.message);
        res.status(500).json({error:error.message});
    }
};

//GET USER BY ID
export const getUserById = async (req,res)=>{
    const {id} = req.params;
    try{
        const [user] = await pool.query("SELECT id,username,email FROM users WHERE id=?",[id]);

        if(user.length === 0)
            return res.status(404).json({"message":"User Not Found"});

        res.status(200).json({
            "status":"successful",
            "message":`User with ${id} retrieved successfully`,
            "data":user
        });

    }catch(error){
        console.log("Error:",error.message);
        res.status(500).json({error:error.message});
    }
};

//UPDATE USER BY ID
export const updateUser = async (req,res)=>{
    const {id} = req.params;
    const {username,email,password} = req.body;
    try{
        if(!username || !email || !password)
            return res.status(400).json({"message":"All fields are required"});

        const [existingUser] = await pool.query("SELECT id FROM users WHERE id=?",[id]);

        if(existingUser.length === 0)
            return res.status(404).json({"message":"User Not Found"});

        const [emailCheck] = await pool.query("SELECT id FROM users WHERE email=? AND id!=?",[email,id]);

        if(emailCheck.length > 0)
            return res.status(400).json({"message":"Email already exists"});

        await pool.query(
            "UPDATE users SET username=?,email=?,password=? WHERE id=?",
            [username,email,password,id]
        );

        res.status(200).json({
            "status":"successful",
            "message":"User updated successfully",
            "data":{id,username,email}
        });

    }catch(error){
        console.log("Error:",error.message);
        res.status(500).json({error:error.message});
    }
};

//DELETE USER BY ID
export const deleteUser = async (req,res)=>{
    const {id} = req.params;
    try{
        const [del] = await pool.query("DELETE FROM users WHERE id=?",[id]);

        if(del.affectedRows === 0)
            return res.status(404).json({"message":"User Not Found"});

        res.status(200).json({"message":"User Deleted successfully"});

    }catch(error){
        console.log("Error:",error.message);
        res.status(500).json({error:error.message});
    }
};
