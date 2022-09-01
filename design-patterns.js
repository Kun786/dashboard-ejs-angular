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
