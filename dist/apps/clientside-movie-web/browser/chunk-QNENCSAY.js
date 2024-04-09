import{A as l,C as v,E as u,P as D,R as G,S as T,U as k,W as c,Z as A,_ as O,aa as S,ba as m,c as R,ca as w,da as C,e as M,g as f,ga as j,ia as F,j as b,ja as N,k as U,l as g,m as h,n as V,na as I,oa as q,t as y,u as s,v as x,y as n,z as o}from"./chunk-HDCJJROI.js";var d=(()=>{let e=class e{constructor(r,t){this.router=r,this.http=t,this.authUrl=O.dataApiUrl+"/api/",this.userSubject=new R(JSON.parse(localStorage.getItem("user")||"null")),this.user=this.userSubject.asObservable()}get userValue(){return this.userSubject.value}login(r,t){return this.http.post(this.authUrl+"auth/login",{username:r,password:t}).pipe(M(a=>(localStorage.setItem("user",JSON.stringify(a)),this.userSubject.next(a),a)))}logout(){localStorage.removeItem("user"),this.userSubject=new R(JSON.parse(localStorage.getItem("user")||"null")||void 0),this.router.navigate(["/login"])}register(r){return this.http.post(this.authUrl+"auth/register",r)}getToken(){return this.userValue!==null&&this.userValue!==void 0&&this.userValue.token||""}};e.\u0275fac=function(t){return new(t||e)(g(c),g(G))},e.\u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var L=(()=>{let e=class e{constructor(r,t,a,p){this.formBuilder=r,this.route=t,this.router=a,this.authService=p}ngOnInit(){this.loginForm=this.formBuilder.group({username:["",m.required],password:["",m.required]})}getUsername(){return this.loginForm.get("username")}getPassword(){return this.loginForm.get("password")}onSubmit(){this.submitted=!0,!this.loginForm.invalid&&this.authService.login(this.getUsername()?.value,this.getPassword()?.value).pipe(f()).subscribe(()=>{let r="/";this.router.navigateByUrl(r)})}};e.\u0275fac=function(t){return new(t||e)(s(I),s(k),s(c),s(d))},e.\u0275cmp=h({type:e,selectors:[["org-login"]],decls:17,vars:1,consts:[[1,"mx-20","h-screen"],["enctype","multipart/form-data",3,"formGroup","ngSubmit"],[1,"text-lg","text-white","font-medium"],["for","username",1,"block","text-sm","text-white"],["type","text","formControlName","username","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["for","password",1,"block","text-sm","text-white"],["type","password","formControlName","password","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["type","submit",1,"px-6","py-2","font-medium","tracking-wide","text-white","capitalize","transition-colors","duration-300","transform","bg-blue-600","rounded-lg","hover:bg-blue-500","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-80"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"form",1),v("ngSubmit",function(){return a.onSubmit()}),n(2,"div")(3,"h2",2),u(4,"Login"),o()(),l(5,"br"),n(6,"div")(7,"label",3),u(8,"Username"),o(),l(9,"input",4),o(),n(10,"div")(11,"label",5),u(12,"Password"),o(),l(13,"input",6),o(),l(14,"br"),n(15,"button",7),u(16," Submit "),o()()()),t&2&&(y(1),x("formGroup",a.loginForm))},dependencies:[j,S,w,C,F,N]});let i=e;return i})();var P=(()=>{let e=class e{constructor(r,t,a,p){this.formBuilder=r,this.route=t,this.router=a,this.authService=p,this.submitted=!1}ngOnInit(){this.registerForm=this.formBuilder.group({username:["",m.required],password:["",[m.required,m.minLength(6)]],birthdate:["",[m.required]],country:["",[m.required]],description:[""]})}onSubmit(){this.submitted=!0,!this.registerForm.invalid&&this.authService.register(this.registerForm.value).pipe(f()).subscribe(()=>{this.router.navigate(["../login"],{relativeTo:this.route})})}};e.\u0275fac=function(t){return new(t||e)(s(I),s(k),s(c),s(d))},e.\u0275cmp=h({type:e,selectors:[["org-register"]],decls:29,vars:1,consts:[[1,"mx-20","h-screen"],["enctype","multipart/form-data",3,"formGroup","ngSubmit"],[1,"text-lg","text-white","font-medium"],["for","username",1,"block","text-sm","text-white"],["type","text","formControlName","username","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["for","password",1,"block","text-sm","text-white"],["type","password","formControlName","password","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["for","birthdate",1,"block","text-sm","text-white"],["type","date","formControlName","birthdate","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["for","country",1,"block","text-sm","text-white"],["type","text","formControlName","country","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["for","description",1,"block","text-sm","text-white"],["type","text","formControlName","description","placeholder","",1,"block","mt-2","w-full","placeholder-gray-400/70","dark:placeholder-gray-500","rounded-lg","border","border-gray-200","bg-white","px-5","py-2.5","text-gray-700","focus:border-blue-400","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-40","dark:border-gray-600","dark:bg-gray-900","dark:text-gray-300","dark:focus:border-blue-300"],["type","submit",1,"px-6","py-2","font-medium","tracking-wide","text-white","capitalize","transition-colors","duration-300","transform","bg-blue-600","rounded-lg","hover:bg-blue-500","focus:outline-none","focus:ring","focus:ring-blue-300","focus:ring-opacity-80"]],template:function(t,a){t&1&&(n(0,"div",0)(1,"form",1),v("ngSubmit",function(){return a.onSubmit()}),n(2,"div")(3,"h2",2),u(4,"Register"),o()(),l(5,"br"),n(6,"div")(7,"label",3),u(8,"Username"),o(),l(9,"input",4),o(),n(10,"div")(11,"label",5),u(12,"Password"),o(),l(13,"input",6),o(),n(14,"div")(15,"label",7),u(16,"Birthdate"),o(),l(17,"input",8),o(),n(18,"div")(19,"label",9),u(20,"Country"),o(),l(21,"input",10),o(),n(22,"div")(23,"label",11),u(24,"Description"),o(),l(25,"input",12),o(),l(26,"br"),n(27,"button",13),u(28," Submit "),o()()()),t&2&&(y(1),x("formGroup",a.registerForm))},dependencies:[j,S,w,C,F,N]});let i=e;return i})();var J=[{path:"login",pathMatch:"full",component:L},{path:"register",pathMatch:"full",component:P}],ge=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=V({type:e}),e.\u0275inj=U({providers:[d],imports:[D,q,T,A.forChild(J),A]});let i=e;return i})();var ye=(()=>{let e=class e{constructor(r){this.auth=r}intercept(r,t){return this.auth.getToken()!==""&&(r=r.clone({setHeaders:{Authorization:`Bearer ${this.auth.getToken()}`}})),t.handle(r)}};e.\u0275fac=function(t){return new(t||e)(g(d))},e.\u0275prov=b({token:e,factory:e.\u0275fac});let i=e;return i})();export{d as a,ge as b,ye as c};