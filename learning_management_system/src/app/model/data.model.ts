export interface user{
  id: number;
  name:string;
  email:string;
  password:string;
  role:string;

 
  }


export interface Student {
     _id: number;
     name: string;
     email: string;
     courses:course[];
  

  }

  export interface course{
    courseID: number;
    name:string;
    lecturer:string;
    registerState:string;
   }