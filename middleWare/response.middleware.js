async function formattedResponse(response, req, res, next) {
    try{
      const sort = req.query.sort ? { [req.query.sort]: 1 } : {};
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skipPage = (page-1) * limit;
  
      // console.log("page:::", page);
      // console.log("limit:::", limit);
  
      // console.log("sort::::", sort);
      const select = req.query.select ? req.query.select : "";
      let selectOptions = {};
      select !== "" && select.split(",").forEach((opt) => {
        selectOptions = {
          ...selectOptions,
          [opt]: 1
        }
      })
  
      selectOptions = {
        ...selectOptions,
        _id: 0
      }
      if (!response) {
        next();
      }
      // console.log("Response:::", response, "Options::", options);
      // const { sort } = options;
      // console.log("Response:::::", response);
      const finalResponse = await response.limit(limit).skip(skipPage).sort(sort).select(selectOptions);
      res.status(200).json({
        data: finalResponse,
        currentPage: page,
        nextPage: +page + 1,
        limit: limit
      })
    }catch(err) {
      next(err);
    }
  
  }
  
  module.exports = formattedResponse; 