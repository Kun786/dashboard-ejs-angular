 @Get()
  async getPmsProject(
    @Request() req,
    @Response() res,
    @Query() query: { name: string },
  ) {
    try {
      const data:any = await this.vesselService.findAll(query?.name);
      data.forEach((element: any, i: any) => {
        element.assigneeName = '' //Creating a new key-pair to my existing object 
        if(!!element.assignee){ //if this is null or undefined
          element.assignee.forEach((assigneeObj: any) => {
            element.assigneeName = element.assigneeName + assigneeObj.name + ', '; //populating the value
          })
        }
        element.assigneeName = element.assigneeName.slice(0, -2); // removing last to characters
      })
      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Something Went Wrong',
        trace: err.message,
      });
    }
  }




// correct way of calling axios
  async mergeChildFileComponentsByChildId(body): Promise<any> {
    let results = axios.post('http://43.204.82.5:5000/merge_components',{
      parent_id: 'dfgkgfdg' //body.parent_file_id,
    })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.message
      });
    return results;
  }
  
  //simplest way always send res.data to avoid circular data error
  try {
      let results = await axios.post('http://43.204.82.5:5000/merge_components', {
        parent_id: 'dfgkgfdg' //body.parent_file_id,
      })
      return results.data;
    } catch (error) {
      return error.message;
    }





// Before and After


  this.SourceData2.forEach((element: any) => {
                let payLoadObject = {};
                payLoadObject['id_'] = element._id;
                payLoadObject['name'] = element.component_object.name;
                let payLoadObjectForBrandName = {};
                payLoadObjectForBrandName['id_'] = element._id;
                payLoadObjectForBrandName['name'] = !(element.component_object.maker_brand) ? '' : element.component_object.maker_brand;
                this.payLoadForUpdateShellComponentSimilarity.push(payLoadObject);
                this.payLoadForUpdateBrandNameSimilarity.push(payLoadObjectForBrandName);
              })  


 populateDataFormUpdateButtons(data:any){
    data.forEach((element: any) => {
      const { _id: id_ , component_object } = element;
      this.payLoadForUpdateShellComponentSimilarity.push({
        id_,
        name: component_object.name ??  '' 
      });
      this.payLoadForUpdateBrandNameSimilarity.push({
        id_,
        name: component_object.maker_brand ??  '' 
      });
      this.payLoadForUpdateMachineryComponent.push({
        id_,
        name: component_object.shell_component ?? ''
      })
    })
  }
