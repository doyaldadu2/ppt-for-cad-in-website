(()=>{'use strict';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,D=RM?0:1,$=s=>document.querySelector(s);
const CY=0x3de6ff,BL=0x2f7bff,AM=0xffb347;
/* ---------- Slide content (from the supplied 12-slide deck) ---------- */
const S=[
{h:'Introduction',t:'CAD-Based Aerospace Design and 3D Modelling',l:'Engineering safer, lighter, stronger and more efficient aircraft and spacecraft before physical manufacturing.',c:1,b:'intro',ox:0,cam:[5,.8,7.5,0,0,0],n:'Press → or click ›  to begin'},
{h:'CAD in Aerospace',t:'Introduction to CAD in Aerospace',l:'Computer-aided design builds complex aerospace structures in virtual space: 2D drawings first, then 3D models and assemblies.',b:'cad',ox:2.3,cam:[0,1.6,9,0,0,0],st:1,p:[['Design analysis','Examine dimensions, shapes, clearances and structural arrangements.'],['Rapid iteration','Modify a design quickly and compare alternatives.'],['Early error detection','Find problems on screen, before any physical build.'],['Accuracy and cost','Higher accuracy, time savings and lower costs.']]},
{h:'Aircraft Design',t:'Aircraft Design',l:'Drag to rotate the aircraft. Select a part to highlight it.',b:'plane3',ox:2.2,cam:[0,1.5,9,0,0,0],p:[['Wings','Airfoil and camber are shaped for maximum lift with minimal drag.'],['Fuselage','The main body. Layout follows the mission: passenger, cargo or military.'],['Tail','Vertical and horizontal stabilizers give stability and control.'],['Landing gear','Shock struts and retraction envelopes support take-off and landing.']]},
{h:'Engine Design',t:'Engine Design Using CAD',l:'A simplified turbofan with illustrative geometry. Select a stage to explore it.',b:'engine',ox:2.2,cam:[0,1,10,0,0,0],p:[['Inlet and fan','Draws air into the engine. Fan geometry is modelled for smooth airflow.'],['Compressor','Compresses the air. Blade tip clearances and duct tolerances are tightly controlled.'],['Combustion chamber','Fuel burns here. Thermal analysis checks high-temperature resistance.'],['Turbine','Extracts energy to drive the compressor. Centrifugal loads and creep are analysed.'],['Nozzle','Accelerates the exhaust to produce thrust.']]},
{h:'Aircraft Components',t:'Aircraft Components Using CAD',l:'Every component is fitted digitally, so assemblies are checked for clashes before anything is built.',b:'plane5',ox:2.2,cam:[0,1.5,9,0,0,0],p:[['Fuselage','Pressurized main body housing cabins and cargo bays.'],['Wing','Airfoil geometry that generates lift and houses internal fuel tanks.'],['Tail','Vertical and horizontal stabilizers for stability and control.'],['Landing gear','Shock struts and kinematic retraction envelopes.'],['Engine','Pylon mounting interfaces and nacelle airflow routing.']]},
{h:'Aerodynamics',t:'Aerodynamics',l:'Aerodynamics is the study of how air flows around an aircraft. CAD shapes help reduce drag and raise efficiency.',b:'aero',ox:2.2,cam:[0,0,9,0,0,0],n:'In steady level flight: lift = weight and thrust = drag. Airflow is a schematic, not CFD output.',p:[['Lift','The aerodynamic force that helps the aircraft rise and stay airborne.'],['Drag','Air resistance opposing forward motion.'],['Thrust','Propulsive force pushing the aircraft forward.'],['Weight','Gravitational force pulling the aircraft downward.']]},
{h:'Simulation and Analysis',t:'CAD Simulation and Structural Analysis',l:'Virtual testing finds design problems before physical manufacturing, improving safety and cutting cost.',b:'fea',ox:2.2,cam:[0,1.5,9,0,0,0],n:'Illustrative animation only. Not a validated engineering result.',p:[['Simulation','Test designs virtually before building physical components.'],['Deformation','Structures bend under load. Analysis checks the shape change stays acceptable.'],['CFD','Computational Fluid Dynamics studies airflow around the aircraft.'],['Finite element analysis','Divides the part into a mesh of elements to check strength, stress and deformation.']]},
{h:'Spacecraft Design',t:'Spacecraft Design Using CAD',l:'Drag to rotate the capsule. Select a feature to see its role.',b:'craft',ox:2.2,cam:[0,.6,10,0,0,0],p:[['Structural design','Load-bearing frames engineered for launch loads.'],['Component placement','Precise internal packaging of avionics, tanks and life support.'],['Thermal protection','Heat shield geometry and insulation routing for re-entry.'],['Antenna positioning','Line-of-sight placement for communication dishes.'],['Lightweight structures','Honeycomb sandwich panels and composite lattice structures.']]},
{h:'Satellite Design',t:'Satellite Design and 3D Modelling',l:'A modular structural bus carries the electronics. Select a subsystem to highlight it.',b:'sat',ox:2.2,cam:[0,1.2,9,0,0,0],tools:['CATIA','Siemens NX','SolidWorks','AutoCAD'],n:'Industry-standard tools for surface modelling, CAE simulation and technical documentation.',p:[['Solar panels','Symmetrical folding array wings deploy in orbit.'],['Communication','High-frequency transponders and antennas.'],['Sensors','Optical payload mounts and sensors.'],['Satellite bus','Modular structure housing the core electronics.']]},
{h:'Manufacturing',t:'CAD-Guided Aerospace Manufacturing',l:'The digital model drives production from design floor to assembly line. A sample part is revealed from wireframe to solid.',b:'mfg',ox:2.2,cam:[0,0,9,0,0,0],p:[['CNC machining','CAD drives 5-axis CNC machining, assembly and fitting.'],['3D printing','Additive manufacturing builds complex parts and conformal cooling channels.'],['Precision','Repeatable accuracy and interchangeable components.'],['Waste reduction','Less raw titanium and carbon-fibre waste, and shorter lead times.']]},
{h:'Benefits and Future',t:'Benefits and Future Technologies',l:'CAD brings higher accuracy, safety, cost and time efficiency. Select a future direction.',b:'future',ox:2.3,cam:[0,0,9,0,0,0],p:[['AI-assisted design','AI-powered generative CAD proposes and refines designs.'],['Lightweight materials','Next-generation materials and topology-optimised structures.'],['Predictive simulation','Analytics that predict performance before testing.'],['Sustainable aerospace','Electric and sustainable aircraft, supported by digital twins.']]},
{h:'Conclusion',t:'CAD: DESIGNING A BETTER, SAFER AND SMARTER SKY!',l:'CAD is transforming aerospace engineering: greater accuracy, safety and efficiency, from manufacturing to future innovation.',c:1,b:'finale',ox:0,cam:[0,1.1,7,0,.6,-12],n:'Thank you. Questions welcome.'}
];
/* ---------- 3D ---------- */
let V={enter(){},hl(){},pick(){}},GL=true,R;
try{R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true})}catch(e){GL=false}
if(!GL){document.body.classList.add('nogl')}else{
R.setPixelRatio(Math.min(devicePixelRatio,2));R.localClippingEnabled=true;
const sc=new THREE.Scene();sc.fog=new THREE.Fog(0x050c1c,22,75);
const cam=new THREE.PerspectiveCamera(42,1,.1,200),look=new THREE.Vector3();
sc.add(new THREE.AmbientLight(0x4a6a9a,.8));
const dl=new THREE.DirectionalLight(0x9fe8ff,1.6);dl.position.set(4,6,5);sc.add(dl);
const rim=new THREE.PointLight(AM,1.2,30);rim.position.set(-5,2,-4);sc.add(rim);
const grid=new THREE.GridHelper(80,80,0x1d6fa5,0x0d2a45);grid.position.y=-2.4;grid.material.transparent=true;grid.material.opacity=.45;sc.add(grid);
{const n=900,a=new Float32Array(n*3);for(let i=0;i<n;i++){const r=45+Math.random()*40,u=Math.random()*6.28,v=Math.acos(2*Math.random()-1);a.set([r*Math.sin(v)*Math.cos(u),Math.abs(r*Math.cos(v))*.8,r*Math.sin(v)*Math.sin(u)],i*3)}
const g=new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(a,3));sc.add(new THREE.Points(g,new THREE.PointsMaterial({color:0x9fdcff,size:1.4,sizeAttenuation:false,transparent:true,opacity:.7,fog:false})))}
const mk=(g,c,o={})=>{const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:.55,roughness:.38,side:2,emissiveIntensity:.7},o)));m.material.userData.e=o.emissive||0;return m};
const flat=(pts,d,c,rot=1)=>{const g=new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(p=>new THREE.Vector2(p[0],p[1]))),{depth:d,bevelEnabled:false});g.translate(0,0,-d/2);if(rot)g.rotateX(-Math.PI/2);return mk(g,c)};
const grp=(...a)=>{const g=new THREE.Group();g.add(...a);return g};
const placed=(m,x,y=0,z=0)=>{m.position.set(x,y,z);return m};
const P=(g,list)=>{g.userData.parts=list;list.forEach((os,k)=>os.forEach(o=>o.traverse(m=>{m.userData.part=k})))};
const pts=(n,f)=>{const a=new Float32Array(n*3);for(let i=0;i<n;i++)a.set(f(i),i*3);const g=new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(a,3));const p=new THREE.Points(g,new THREE.PointsMaterial({color:CY,size:.05,transparent:true,opacity:.8}));p.frustumCulled=false;return{p,a,g}};
const arrow=(dx,dy,c,x,y)=>{const s=mk(new THREE.CylinderGeometry(.04,.04,1,8),c,{emissive:c}),h=mk(new THREE.ConeGeometry(.13,.3,12),c,{emissive:c});s.position.y=.5;h.position.y=1.15;const g=grp(s,h);g.rotation.z=Math.atan2(dy,dx)-Math.PI/2;g.position.set(x,y,0);return g};
const sm=(a,b,x)=>THREE.MathUtils.smoothstep(x,a,b);
const B={};
function plane(){const C=0xc9d6e8,W=0x9fb8d8,Mx=Math.PI/2;
const fus=grp(mk(new THREE.CylinderGeometry(.3,.3,3.6,24).rotateZ(Mx),C),placed(mk(new THREE.ConeGeometry(.3,1,24).rotateZ(-Mx),C),2.3,0,0),placed(mk(new THREE.ConeGeometry(.3,1.4,24).rotateZ(Mx),C),-2.5,0,0));
const w=[[.7,0],[-.5,0],[-1,2.6],[-.7,2.6]],w1=flat(w,.07,W),w2=flat(w,.07,W);w2.scale.z=-1;const wing=grp(w1,w2);wing.position.y=-.1;
const fin=flat([[-2,.2],[-3,1.3],[-3.3,1.3],[-2.8,.2]],.05,0xb5c7de,0),st=[1,-1].map(s=>{const m=flat([[-2.4,0],[-3,0],[-3.3,1.1],[-3,1.1]],.04,0xb5c7de);m.scale.z=s;m.position.y=.05;return m});const tail=grp(fin,...st);
const gear=new THREE.Group();[[1.4,0],[-.2,.7],[-.2,-.7]].forEach(([x,z])=>{const s=mk(new THREE.CylinderGeometry(.03,.03,.7),0x888fa0),h=mk(new THREE.CylinderGeometry(.14,.14,.1,16).rotateX(Mx),0x222a38);s.position.set(x,-.62,z);h.position.set(x,-.98,z);gear.add(s,h)});
const eng=new THREE.Group();[1,-1].forEach(s=>{const e=mk(new THREE.CylinderGeometry(.2,.17,.9,20).rotateZ(Mx),0x6d7f9c);e.position.set(.5,-.38,s);eng.add(e)});
const g=grp(fus,wing,tail,gear,eng);return{g,fus,wing,tail,gear,eng}}
const acts=(sx,parts)=>{const a=plane();a.g.scale.setScalar(sx);const g=grp(a.g);P(g,parts(a));g.userData.spin=.25;return g};
B.intro=()=>{const a=plane(),g=grp(a.g);a.g.rotation.y=-.5;const q=pts(500,()=>[(Math.random()-.5)*50,(Math.random()-.5)*9,(Math.random()-.5)*14]);g.add(q.p);g.userData.nodrag=1;g.userData.tick=(t,dt)=>{for(let i=0;i<500;i++){q.a[i*3]-=dt*22;if(q.a[i*3]<-25)q.a[i*3]+=50}q.g.attributes.position.needsUpdate=true;a.g.position.y=Math.sin(t*.8)*.12;a.g.rotation.x=Math.sin(t*.6)*.06};return g};
B.cad=()=>{const a=plane(),w=plane(),g=grp(a.g,w.g),L=['2D drafting: parametric profile','3D modelling: wireframe geometry','Assembly verification: solid model'];let last=-1;
w.g.traverse(m=>{if(m.isMesh)m.material=new THREE.MeshBasicMaterial({color:CY,wireframe:true,transparent:true,opacity:.7})});a.g.traverse(m=>{if(m.isMesh){m.material.transparent=true}});g.scale.setScalar(.85);g.userData.spin=.2;
g.userData.tick=t=>{const u=t%10,k=sm(2.5,5,u),o=sm(6,8.5,u),s=u<3?0:u<6.5?1:2;w.g.scale.z=.02+.98*k;a.g.traverse(m=>{if(m.isMesh)m.material.opacity=o});if(s!==last){last=s;const e=$('#stage');if(e)e.textContent=L[s]}};return g};
B.plane3=()=>acts(.85,a=>[[a.wing],[a.fus],[a.tail],[a.gear]]);
B.plane5=()=>acts(.85,a=>[[a.fus],[a.wing],[a.tail],[a.gear],[a.eng]]);
B.engine=()=>{const g=new THREE.Group(),sp=[],Mx=Math.PI/2;
const shell=mk(new THREE.CylinderGeometry(.95,.95,5.4,40,1,true).rotateZ(Mx),0x5d7aa8,{transparent:true,opacity:.16});
const disc=(x,r,n,c)=>{const d=new THREE.Group();d.position.x=x;d.add(mk(new THREE.CylinderGeometry(r*.25,r*.25,.22,16).rotateZ(Mx),0x8aa0c0));for(let i=0;i<n;i++){const p=new THREE.Group();p.rotation.x=i*6.283/n;const b=mk(new THREE.BoxGeometry(.05,r*.75,.17),c);b.position.y=r*.62;b.rotation.y=.5;p.add(b);d.add(p)}sp.push(d);return d};
const inlet=grp(disc(-2.4,.9,18,0x7fd8ff)),comp=grp(disc(-1.55,.72,22,0x5fb0ff),disc(-1.05,.62,22,0x5fb0ff),disc(-.6,.52,22,0x5fb0ff)),
comb=grp(placed(mk(new THREE.CylinderGeometry(.55,.55,.9,24,1,true).rotateZ(Mx),0xff8a2a,{emissive:0xc4570a}),.3,0,0)),
turb=grp(disc(1.1,.58,20,0xffd08a),disc(1.5,.54,20,0xffd08a)),
nozzle=grp(placed(mk(new THREE.CylinderGeometry(.62,.42,1,32,1,true).rotateZ(Mx),0xaab8cc),2.4,0,0),placed(mk(new THREE.ConeGeometry(.28,1,16).rotateZ(-Mx),0x667790),2.5,0,0));
g.add(shell,inlet,comp,comb,turb,nozzle);P(g,[[inlet],[comp],[comb],[turb],[nozzle]]);g.rotation.y=.5;g.scale.setScalar(.9);
g.userData.tick=(t,dt)=>sp.forEach((d,i)=>d.rotation.x+=dt*(2+i*.15));return g};
B.aero=()=>{const g=new THREE.Group(),f=x=>.7*(.2969*Math.sqrt(x)-.126*x-.3516*x*x+.2843*x**3-.1015*x**4),c=x=>.05*Math.sin(Math.PI*x),up=[],lo=[];
for(let i=0;i<=40;i++){const x=i/40;up.push(new THREE.Vector2((x-.5)*3,(c(x)+f(x))*3));lo.push(new THREE.Vector2((x-.5)*3,(c(x)-f(x))*3))}
const eg=new THREE.ExtrudeGeometry(new THREE.Shape(up.concat(lo.reverse())),{depth:1.4,bevelEnabled:false});eg.translate(0,0,-.7);const foil=mk(eg,0xc9d6e8);foil.rotation.z=-.1;
const N=420,Y=[],q=pts(N,i=>{const y=(.35+Math.random()*1.15)*(i%2?1:-1);Y.push(y);return[(Math.random()-.5)*8,y,(Math.random()-.5)*1.2]});
const A=[arrow(0,1,CY,.1,.5),arrow(-1,0,0xe8f3ff,-2.2,0),arrow(1,0,BL,1.9,0),arrow(0,-1,AM,.1,-.5)];A.forEach(a=>a.scale.setScalar(1.1));g.add(foil,q.p,...A);P(g,A.map(a=>[a]));g.userData.nodrag=1;
g.userData.tick=(t,dt)=>{for(let i=0;i<N;i++){let x=q.a[i*3]+dt*2.4;if(x>4)x-=8;q.a[i*3]=x;const y0=Y[i];q.a[i*3+1]=y0+(y0>0?.35:-.15)*Math.exp(-x*x/1.2)*(1-Math.min(1,Math.abs(y0)/1.5))}q.g.attributes.position.needsUpdate=true};return g};
B.fea=()=>{const g=new THREE.Group(),geo=new THREE.BoxGeometry(4,.14,1.1,36,1,8),o=geo.attributes.position.array.slice(),n=geo.attributes.position.count,col=new Float32Array(n*3);geo.setAttribute('color',new THREE.BufferAttribute(col,3));
const wing=mk(geo,0xffffff,{vertexColors:true}),wire=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.22})),wall=mk(new THREE.BoxGeometry(.2,.9,1.5),0x2a3a55);wall.position.x=-2.1;
const lift=arrow(0,1,AM,1.7,0);lift.scale.setScalar(1.2);const fl=pts(140,()=>[0,0,0]);g.add(wing,wire,wall,lift,fl.p);P(g,[[wing],[wing,wall],[fl.p],[wire]]);g.rotation.y=-.5;
const K=[0x1d4ed8,CY,AM,0xff4d4d].map(h=>new THREE.Color(h)),cc=new THREE.Color();
g.userData.tick=(t,dt)=>{const l=.5+.5*Math.sin(t*1.2),p=geo.attributes.position;for(let i=0;i<n;i++){const x=(o[i*3]+2)/4,s=Math.min(1,l*(1.15-x)*(.8+.4*Math.abs(o[i*3+2]))),k=Math.min(2.999,s*3),j=Math.floor(k);cc.copy(K[j]).lerp(K[j+1]||K[j],k-j);col.set([cc.r,cc.g,cc.b],i*3);p.setY(i,o[i*3+1]+l*.9*x*x)}
p.needsUpdate=true;geo.attributes.color.needsUpdate=true;geo.computeVertexNormals();lift.position.y=l*.9+.1;
for(let i=0;i<140;i++){const x=((i/140*6+t*.8)%6)-3;fl.a.set([x,.45+.25*Math.exp(-x*x/1.5)+l*.9*.5*Math.max(0,x+2)/4+(i%7)*.06,((i*37)%10)/10-.5],i*3)}fl.g.attributes.position.needsUpdate=true};return g};
B.craft=()=>{const s=new THREE.Group(),g=grp(s),Mx=Math.PI/2;s.position.y=-.5;
const cap=mk(new THREE.CylinderGeometry(.28,.8,1.1,32),0xd5dfef);cap.position.y=1.55;
const shield=mk(new THREE.SphereGeometry(.85,32,8,0,6.283,0,1),0x7a4a2a,{emissive:0x2a1000});shield.rotation.x=Math.PI;shield.position.y=1.46;
const mod=mk(new THREE.CylinderGeometry(.8,.8,1.6,32,1,true),0xc9a24a,{transparent:true,opacity:.28});mod.position.y=-.2;
const frame=mk(new THREE.CylinderGeometry(.82,.82,1.6,12,4),CY,{wireframe:true,emissive:0x0a5a6a});frame.position.y=-.2;
const tanks=[-.35,.35].map(x=>{const t=mk(new THREE.SphereGeometry(.3,20,16),0xe0a040);t.position.set(x,-.45,0);return t}),av=[.15,-.9].map(y=>{const b=mk(new THREE.BoxGeometry(.4,.28,.4),0x4a6aa0);b.position.set(0,y,0);return b});
const bell=mk(new THREE.ConeGeometry(.4,.6,20,1,true),0x667790);bell.position.y=-1.3;bell.rotation.x=Math.PI;
const mast=mk(new THREE.CylinderGeometry(.03,.03,.7).rotateZ(Mx),0xaab8cc),dish=mk(new THREE.SphereGeometry(.45,20,8,0,6.283,0,1.1),0xe8f3ff);mast.position.set(1.1,.5,0);dish.position.set(1.5,.7,0);dish.rotation.z=-Mx;
const hc=new THREE.Group();for(let i=0;i<7;i++){const h=mk(new THREE.CylinderGeometry(.13,.13,.08,6).rotateX(Mx),0xc9d6e8);if(i){const a=i*1.047;h.position.set(Math.cos(a)*.27,Math.sin(a)*.27,0)}hc.add(h)}hc.position.set(-1.7,.5,0);hc.rotation.y=.6;
s.add(cap,shield,mod,frame,...tanks,...av,bell,mast,dish,hc);P(g,[[frame],[...tanks,...av],[shield],[mast,dish],[hc]]);g.userData.spin=.2;return g};
B.sat=()=>{const g=new THREE.Group(),Mx=Math.PI/2,bus=mk(new THREE.BoxGeometry(1.1,1.1,1.5),0xc9a24a),panels=[],horns=[];
[1,-1].forEach(s=>{const arm=mk(new THREE.CylinderGeometry(.04,.04,.5).rotateZ(Mx),0xaab8cc),p=mk(new THREE.BoxGeometry(2.2,.04,1.2),0x14316b,{emissive:0x0a1a3a}),w=new THREE.Mesh(new THREE.BoxGeometry(2.2,.045,1.2,6,1,3),new THREE.MeshBasicMaterial({color:CY,wireframe:true,transparent:true,opacity:.35}));arm.position.x=s*.8;p.position.x=w.position.x=s*1.95;panels.push(arm,p,w)});
const mast=mk(new THREE.CylinderGeometry(.04,.04,.35),0xaab8cc),dish=mk(new THREE.SphereGeometry(.5,20,8,0,6.283,0,1.1),0xe8f3ff);mast.position.y=.72;dish.position.y=1.1;dish.rotation.x=-.3;
[-.3,.3].forEach(x=>{const h=mk(new THREE.ConeGeometry(.1,.3,12),0xd0d8e4);h.position.set(x,-.2,.85);h.rotation.x=Mx;horns.push(h)});
const opt=mk(new THREE.CylinderGeometry(.2,.26,.55,20).rotateX(Mx),0x222a38),st=mk(new THREE.CylinderGeometry(.08,.08,.25,12).rotateX(Mx),0x222a38);opt.position.set(.1,.3,1);st.position.set(-.35,.35,.85);
g.add(bus,...panels,mast,dish,...horns,opt,st);P(g,[panels,[mast,dish,...horns],[opt,st],[bus]]);g.rotation.set(.3,.6,0);g.userData.spin=.35;return g};
B.mfg=()=>{const g=new THREE.Group(),pl=new THREE.Plane(new THREE.Vector3(-1,0,0),-2),Mx=Math.PI/2;
const build=w=>{const M=(geo,c)=>w?new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:CY,wireframe:true,transparent:true,opacity:.4})):mk(geo,c,{metalness:.85,roughness:.25});const d=new THREE.Group();d.add(M(new THREE.CylinderGeometry(.9,.9,.3,32).rotateX(Mx),0xb9c4d4),M(new THREE.TorusGeometry(1.75,.07,8,56),0xb9c4d4),M(new THREE.TorusGeometry(.9,.05,8,40),0xb9c4d4));
for(let i=0;i<18;i++){const p=new THREE.Group();p.rotation.z=i*6.283/18;const b=M(new THREE.BoxGeometry(.1,.95,.32),0xb9c4d4);b.position.y=1.3;b.rotation.y=.4;p.add(b);d.add(p)}return d};
const solid=build(0),wire=build(1);solid.traverse(m=>{if(m.material)m.material.clippingPlanes=[pl]});
const bar=mk(new THREE.BoxGeometry(.04,4,.6),AM,{emissive:AM});g.add(wire,solid,bar);P(g,[[solid],[solid],[wire],[bar]]);g.rotation.y=-.35;
g.userData.tick=t=>{const c=-2+4*sm(0,1,(t*.12)%1.35);pl.constant=c;bar.position.x=c};return g};
B.future=()=>{const g=new THREE.Group(),it=[],mkI=(geo,x,y,c=CY)=>{const m=mk(geo,c,{wireframe:true,emissive:0x0a4a5a});m.position.set(x,y,0);it.push(m);return m};
const ai=mkI(new THREE.IcosahedronGeometry(.7,1),-1.3,1.1),lw=mkI(new THREE.BoxGeometry(1,1,1,3,3,3),1.3,1.1),ps=mkI(new THREE.TorusKnotGeometry(.45,.14,90,10),-1.3,-1.1,AM),su=mkI(new THREE.TorusGeometry(.6,.05,8,40),1.3,-1.1,0x6ef0a0);su.add(mk(new THREE.SphereGeometry(.3,16,12),0x6ef0a0,{emissive:0x1a6a3a}));
g.add(...it);P(g,[[ai],[lw],[ps],[su]]);g.userData.tick=(t,dt)=>it.forEach((m,i)=>{m.rotation.y+=dt*(.5+i*.1);m.rotation.x+=dt*.3});return g};
B.finale=()=>{const a=plane(),g=grp(a.g);a.g.rotation.y=Math.PI/2;a.g.scale.setScalar(.45);
const sun=new THREE.Mesh(new THREE.SphereGeometry(3.5,32,16),new THREE.MeshBasicMaterial({color:AM,fog:false})),halo=new THREE.Mesh(new THREE.SphereGeometry(7,32,16),new THREE.MeshBasicMaterial({color:AM,transparent:true,opacity:.14,fog:false}));sun.position.set(0,1,-55);halo.position.copy(sun.position);g.add(sun,halo);
g.userData.nodrag=1;g.userData.fixed=1;g.userData.tick=(t,dt)=>{a.g.position.z-=dt*1.8;if(a.g.position.z<-38)a.g.position.z=3;a.g.position.y=.6+Math.sin(t)*.1;a.g.rotation.x=Math.sin(t*.7)*.05};a.g.position.set(0,.6,3);return g};
const G=S.map(s=>{const g=B[s.b]();g.visible=false;g.position.x=s.ox;sc.add(g);return g});
let act=null,tilt=1;
const resize=()=>{const w=innerWidth,h=innerHeight;R.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()};addEventListener('resize',resize);resize();
V.enter=i=>{const s=S[i],c=s.cam,k=innerWidth/innerHeight<1.1?1.5:1,d=1.7*D;
if(act&&act!==G[i]){const o=act;gsap.to(o.scale,{x:.001,y:.001,z:.001,duration:.3*D,onComplete:()=>{o.visible=false}})}
act=G[i];act.visible=true;act.userData.t=0;if(!act.userData.fixed)act.rotation.set(act.rotation.x,act.userData.ry??=act.rotation.y,0);
act.scale.setScalar(.001);gsap.to(act.scale,{x:1,y:1,z:1,duration:1.1*D,delay:.3*D,ease:'back.out(1.4)'});
gsap.to(cam.position,{x:c[0],y:c[1],z:c[2]*k,duration:d,ease:'power3.inOut'});gsap.to(look,{x:c[3],y:c[4],z:c[5],duration:d,ease:'power3.inOut'});grid.visible=true;V.hl(-1)};
V.hl=j=>{if(!act||!act.userData.parts)return;act.userData.parts.forEach((os,k)=>os.forEach(o=>o.traverse(m=>{const t=m.material;if(!t||Array.isArray(t))return;if(t.emissive)t.emissive.setHex(k===j?AM:t.userData.e||0);else if(t.color){t.userData.c??=t.color.getHex();t.color.setHex(k===j?AM:t.userData.c)}})))};
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
const hit=e=>{if(!act)return-1;mv.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(act.children,true).find(x=>x.object.userData.part!==undefined);return h?h.object.userData.part:-1};
let drag=0,lx=0,ly=0,mvd=0,idle=0;const cv=$('#gl');
cv.addEventListener('pointerdown',e=>{drag=1;mvd=0;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(drag&&act&&!act.userData.nodrag){const dx=e.clientX-lx,dy=e.clientY-ly;mvd+=Math.abs(dx)+Math.abs(dy);act.rotation.y+=dx*.008;act.rotation.x=Math.max(-.8,Math.min(.8,act.rotation.x+dy*.005));idle=3}lx=e.clientX;ly=e.clientY;if(!drag)cv.style.cursor=hit(e)>=0?'pointer':''});
cv.addEventListener('pointerup',e=>{drag=0;if(mvd<5){const k=hit(e);if(k>=0)window.selPart(k)}});
let T=RM?7:0,last=performance.now();
(function loop(now){requestAnimationFrame(loop);const dt=RM?0:Math.min(.05,(now-last)/1000);last=now;T+=dt;idle=Math.max(0,idle-dt);
if(act){if(act.userData.spin&&!drag&&!idle)act.rotation.y+=dt*act.userData.spin;act.userData.tick&&act.userData.tick(T,dt)}
cam.lookAt(look);R.render(sc,cam)})(last);
}
/* ---------- UI / navigation ---------- */
let cur=-1,sel=-1,tl;const ui=$('#ui');
window.selPart=j=>{const p=S[cur].p;if(!p)return;sel=j;document.querySelectorAll('.chips button').forEach((b,k)=>b.classList.toggle('on',k===j));$('#info').innerHTML=`<b>${p[j][0]}</b><br>${p[j][1]}`;V.hl(j)};
function render(i){const s=S[i];sel=-1;
ui.innerHTML=`<div class="panel${s.c?' center':''}"><h1>${s.t}</h1><p class="lead">${s.l}</p>${s.st?'<p id="stage"></p>':''}${s.p?'<div class="chips">'+s.p.map((p,k)=>`<button data-k="${k}">${p[0]}</button>`).join('')+'</div>':''}${s.tools?'<div class="chips">'+s.tools.map(t=>`<span class="tool">${t}</span>`).join('')+'</div>':''}<div id="info">${s.n||''}</div></div>`;
ui.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>selPart(+b.dataset.k));
$('#topic').textContent=s.h;$('#count').textContent=String(i+1).padStart(2,'0')+' / 12';$('#bar i').style.width=(i+1)/12*100+'%';
document.querySelectorAll('#dots button').forEach((b,k)=>b.classList.toggle('on',k===i));
tl&&tl.kill();gsap.fromTo(ui.querySelector('.panel').children,{y:RM?0:26,opacity:0},{y:0,opacity:1,duration:.7*D,stagger:.09*D,ease:'power3.out'});
}
function go(n){n=Math.max(0,Math.min(11,n));if(n===cur)return;const f=cur<0;cur=n;V.enter(n);
if(f){render(n);return}
gsap.fromTo('#wipe',{left:'-1%'},{left:'101%',duration:.9*D,ease:'power2.inOut'});
gsap.to(ui,{opacity:0,duration:.25*D,onComplete:()=>{render(n);gsap.to(ui,{opacity:1,duration:.1*D})}})}
$('#dots').innerHTML=S.map((s,i)=>`<button title="${i+1}. ${s.h}" aria-label="Slide ${i+1}: ${s.h}"></button>`).join('');
document.querySelectorAll('#dots button').forEach((b,i)=>b.onclick=()=>go(i));
$('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
const fs=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});$('#fs').onclick=fs;
addEventListener('keydown',e=>{const k=e.key;if(['ArrowRight','ArrowDown','PageDown',' '].includes(k)){e.preventDefault();go(cur+1)}else if(['ArrowLeft','ArrowUp','PageUp'].includes(k)){e.preventDefault();go(cur-1)}else if(k==='Home')go(0);else if(k==='End')go(11);else if(k==='f'||k==='F')fs()});
let pc=0;const iv=setInterval(()=>{pc=Math.min(100,pc+(RM?50:7));$('#pct').textContent=pc;if(pc>=100){clearInterval(iv);gsap.to('#loader',{opacity:0,duration:.6*D,onComplete:()=>$('#loader').remove()});go(0)}},90);
})();
