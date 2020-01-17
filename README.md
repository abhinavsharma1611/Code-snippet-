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


#2 api response push in an arrary and map 
 getMembers = () => {
    let headers = {
      Accept: "application/json",
      Prefer: "count=exact",
      Authorization: "Bearer " + this.props.token
    };
    let url = apiUrl + "fc_profile?select=*,fc_subscription(*)";
    axios
      .get(url, { headers: headers })
      .then(response => {
        console.log(response.data.length);
        this.props.dispatch({
          type: "MEMBERS",
          payload: response.data.length
        });
        this.props.dispatch({type:"MEMBERSORG",payload:response.data})
        this.setState(
          {
            members: response.data
          },
          () => {
            for (let ownerId in this.state.members) {
              let urluser = apiUrl + "fc_users";
              axios
                .get(urluser, { headers: headers })
                .then(response => {
                  let name = response.data[ownerId].name;
                  let email = response.data[ownerId].email,
                    obj = {
                      ...this.state.members[ownerId],
                      name: name,
                      email: email
                    };
                  console.log(obj);
                  this.setState({
                    membersData: [...this.state.membersData, obj]
                  });
                })
                .catch(err => {});
            }
          }
        );
      })
      .catch(err => {});
  };
