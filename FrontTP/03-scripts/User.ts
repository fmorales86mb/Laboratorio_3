namespace login{
    
    export class User{
        private name : string;
        private pass : string;
        private readonly Url : string = "http://localhost:80/LaComanda/login"

        constructor (name:string, pass: string){
            this.name = name;
            this.pass = pass;
        }

        public LogearUser():void{
            $.post(this.Url, {nombre: this.name, clave : this.pass}, function(data, status){                                 
                if(status == "success" ){
                    EvalRespuesta(data);
                }
            });
        }
    }
}