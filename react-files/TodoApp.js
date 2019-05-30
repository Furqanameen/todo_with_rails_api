import React, { Component } from 'react';

export default class TodoApp extends Component{
  constructor(props){
    super(props);
    this.state={

      item: [],
      title: '',
      content: '',
      selected:'',
    }
    this.fetchDate();
  }
componentDidMount(){
  this.setState({});
  console.log(this.state.check1)

}

  fetchDate = () => {

    fetch("http://192.168.100.79:3000/articals", {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseText) => {
      console.log(responseText);

      this.setState({
        item: responseText
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }



  HandelChangeTitle = (event) =>{
    const value=event.target.value;
    this.setState({
      title: value
    })
  }

  HandelChangeContent = (event) => {
    const value=event.target.value;
    this.setState({
      content: value
    })
  }

  formClick=(event)=>{
     event.preventDefault();
     if(this.state.selected !==""){
       this.updateItems(this.state.selected)
     }else {
    fetch("http://192.168.100.79:3000/articals?title="+this.state.title, {
      method: 'POST',
      body: JSON.stringify({
     })
    })
    .then(res => res.json())
    .then((responseText) => {
        this.state.item.push(responseText)
        this.setState({title: ''})
      // alert(responseText);
    })
    .catch((error)=>{
      console.error(error);
    })
   // .catckeyh(err => console.log(err);
   }
  }
deleteItem = async(key) =>{
  // alert("Are you sure "+key);
  console.log(this.state.key);
  var arr =await this.state.item.filter(function(item) {
     return item.id !== key
  })
  this.setState({item: arr})
  fetch("http://192.168.100.79:3000/articals/"+key, {
    method: 'DELETE',
  })
  .then((response) => response.json())
  .then((responseText) => {
  })
  .catch((error) => {
    console.error(error);
  });
}

check_Hnadel=(key,index)=>{
  fetch('http://192.168.100.79:3000/articals/'+key.id+'?enable='+!key.enable, {
    method: 'PUT'
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if(this.state.item[index].enable){
      console.log("falseeeeeeeeeeeeeeeeeee");
    }else{
      console.log("trueeeeeeeeeeeeeeee");
      // this.updateForm(key);
    }
    this.state.item[index].enable =  !this.state.item[index].enable;
    this.setState({})
  })
  .catch((error) => {
    console.error(error);
  });
}

  updateItems=(key,index)=>{

this.check_Hnadel(key,index);
  console.log("index: "+index)

}
updateForm=(key)=>{
  // alert("this is updated");
  // if(this.state.item[index].enable){
  //   console.log("truuuuuuuuuu")
  // }else{
  //   console.log("falssssssssssssssssss")
  // }
   this.setState({
      title: key.title,
      // content: key.content,
      selected: key.id,
   })
}


show_checked = (item,index) =>{
  if(this.state.item[index].enable){
    return(
      <input onChange={()=>this.updateItems(item,index)} type="checkbox" className="form-check form-check-input" checked={this.state.item[index].enable}/>
    )
  }else{
    return(
      <input onChange={()=>this.updateItems(item,index)} type="checkbox" className="form-check form-check-input" checked={this.state.item[index].enable} />
    )
  }
}


  render() {
    var todoentries=this.state.item;
    var listitem=todoentries.map((items,index)=>{
      return(
          <div key={items.id} className="shadow p-4 mb-5 bg-white rounded">
            <table>
              <tbody>
                <tr>
                  <th>{this.show_checked(items,index)}</th>
                  <th className="col">{items.title} </th>
                  <th><span onClick={()=>this.deleteItem(items.id)} className="glyphicon glyphicon-trash"></span></th>
                </tr>
             </tbody>
            </table>
          </div>
      )
    });
    return(
  <div >
      <div className="header shadow-sm p-3 mb-5 rounded">
          <h1 >Simple react Todo App</h1>
      </div>
       <div className="shadow p-4 mb-5 bg-white rounded">
         <form onSubmit={this.formClick}>
           <table>
             <tbody>
             <tr>
              <th className="col">
                <input className="form-control" value={this.state.title} onChange={this.HandelChangeTitle} placeholder="enter item name"/>
              </th>
              <th><button type="submit"  className="btn btn-primary">submit</button></th>
            </tr>
            </tbody>
          </table>
      </form>
  </div>

      {listitem}
  </div>

    )
  }
}
