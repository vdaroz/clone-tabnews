function status(request, response){
  response.status(200).json({"response" : "Respondendo."});
}

export default status;