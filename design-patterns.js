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



 const dummyPayLoad = [
        {_id:'632d1f0b69277e5385455708',name:"Exhaust Gas Emitter - EGCS"},
        {_id:'632d1f0b69277e5385455708',name:"Luffing Winch - Lifeboat Davit"}
      ]
      const getShellComponentLibrary = await this.libShellComponentLibrary.findBy(
        {'ShellComp_Keywords':{$in:"name"}}
      );


















async getShellComponents(payLoad) {
    try {
      this.validateRepositoryName('Lib_ShellComponent_Library');
      const data = await this.dbo.collection('Lib_ShellComponent_Library').find({}).toArray();
      if (payLoad.length === 0) {
        return false
      } else {
        await payLoad.forEach(async element => {
          const { id_, name } = element;
          const getShellComponentLibrary = data.filter( element => element.ShellComp_Keywords === name );
          if(getShellComponentLibrary.length !== 0){
            const [firstValue] = getShellComponentLibrary;
            const updateChildFiles = await this.pmsChildFiles.updateMany(
              { _id: new ObjectId(id_) },
              [
                {
                  $set: {
                    "component_object.main_machinery": {
                      $concat: [
                        "$component_object.main_machinery",
                        " , ",
                        firstValue["Main Machinery"]
                      ]
                    }
                  }
                }
              ]
            )
          }
        })
        return true
      }
    } catch (error) {
      return error.message;
    }
  }






SERVICE



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private https: HttpClient) {}
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem('auth_app_token')).value}`,
    );

  getCategories(id) {
    return this.https
      .get<any>(`${environment.apiURL}/category?type=${id}`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getAllCategories() {
    return this.https
      .get<any>(`${environment.apiURL}/category/getAll`, {
        headers: this.headers,
      })
      .pipe(map((response: any) => response));
  }

  getTypes() {
    return this.https
      .get<any>(`${environment.apiURL}/types`, { headers: this.headers })
      .pipe(map((response: any) => response));
  }

  addCategory(data) {
    return this.https.post<any>(`${environment.apiURL}/category`, data, {
      headers: this.headers,
    });
  }
  deleteCategory(id) {
    return this.https.delete<any>(`${environment.apiURL}/category/${id}`, {
      headers: this.headers,
    });
  }
  addCategorytype(data) {
    return this.https.post<any>(`${environment.apiURL}/types`, data, {
      headers: this.headers,
    });
  }
  deleteCategoryType(id) {
    return this.https.delete<any>(`${environment.apiURL}/types/${id}`, {
      headers: this.headers,
    });
  }

}

