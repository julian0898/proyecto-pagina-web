const express = require('express')
const repositorio = require('./repositorio')
const app = express()
const port = 3000


app.use(express.json());



app.get("/api/products", async(req, res) => {
  res.send(await repositorio.read());
});


app.post("/api/pay", async(req, res) => {
  const ids= req.body;
  const productsCopy = await repositorio.read();


  let error = false;
  ids.forEach((id) => {
    const product = productsCopy.find((p) => p.id === id);
    if(product.stock > 0){
      product.stock--;
    }else{
      error=true;
    } 
  });

  if(error){
    res.send("sin stock").statusCode(400);
  }else{
    await repositorio.write(productsCopy);
    res.send(productsCopy);

  }
  
});

app.use("/", express.static("frontend"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});