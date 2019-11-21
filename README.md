# Code-snippet-

aDD MEmber MULTIPLE 

submitHandler=(e)=>{

          var a=this.state.email
          var b =a.replace(/\n+/g,",")   
          var z =b.split(/[ ,;]+/);
          var data=[];
          var c =z.map((dataList)=>{
          let e={};
          e.email = dataList;
          e.org_id=this.props.orgid;
          e.role=this.state.role;
          return(data.push(e))
          
          })
            const headers = {
                "Accept": 'application/vnd.pgrst.object+json',
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + this.props.token
              }
              let finalData = JSON.stringify(data)
              let url = apiUrl + 'fc_org_members?';
              axios.post(url,finalData, {
                headers: headers
              }
             )
              .then((response) => {
                window.location.reload();
              })
              .catch((error) => {
               
              })
      }
