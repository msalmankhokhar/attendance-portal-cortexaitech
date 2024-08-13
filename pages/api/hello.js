// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middlewares/db";

function handler(req, res) {
  if (req.method == 'GET'){
    res.json({ hello : 'world' })
  }
}

export default connectDB(handler)