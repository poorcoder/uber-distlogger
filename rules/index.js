module.exports = {

   engineers: [
   ],

   addEngineer: function( email, filter ){
      this.engineers.push({ email: email, filter: filter });
   },

   seed: function(){
      this.addEngineer(
         'kiran.ryali@gmail.com', 
         {
            level: 'WARN',
            component: 'mobile'
         }
      );
      this.addEngineer(
         'engineer2@uber.com', 
         {
            level: 'ERROR',
            component: 'dispatch'
         }
      );
      this.addEngineer(
         'enginee32@uber.com', 
         {
            level: 'ERROR',
            component: 'other'
         }
      );
   }
}
