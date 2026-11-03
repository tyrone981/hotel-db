(function(){
  const KEY='aura_grand_v2';
  const TAX=0.1;
  const $=id=>document.getElementById(id);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const pad=n=>String(n).padStart(2,'0');
  const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
  const today=()=>iso(new Date());
  const plus=(s,n)=>{const d=parse(s);d.setDate(d.getDate()+n);return iso(d)};
  const nights=(a,b)=>Math.round((parse(b)-parse(a))/864e5);
  const dShort=s=>parse(s).toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const dLong=s=>parse(s).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  const money=n=>'$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const ic=n=>`<iconify-icon icon="lucide:${n}"></iconify-icon>`;
  const label=s=>String(s).replace(/_/g,' ');
  const pill=s=>`<span class="pill s-${String(s).toLowerCase()}">${esc(label(s))}</span>`;
  const overlaps=(a,b,c,d)=>a<d&&c<b;
  const plural=(n,w)=>`${n} ${w}${n===1?'':'s'}`;

  const TABS=[
    ['dashboard','layout-dashboard','Front Desk','Front desk overview','Welcoming guests with timeless care.'],
    ['rooms','bed-double','Rooms','Rooms & floors','Readiness and housekeeping at a glance.'],
    ['reservations','calendar-check','Reservations','Reservations','Arrivals, stays and departures.'],
    ['guests','users','Guests','Guest directory','Know our guests and their preferences.'],
    ['services','sparkles','Spa & Services','Spa & experiences','Treatments, dining and personal services.'],
    ['invoices','receipt','Billing','Billing & invoices','Folios, payments and settled accounts.'],
    ['reviews','star','Reviews','Guest reviews','What guests say about their stay.']
  ];

  function seed(){
    const t=today();
    const R=(n,f,type,rate,cap,status,am)=>({id:'r'+n,number:String(n),floor:f,type,rate,capacity:cap,status,amenities:am});
    const rooms=[
      R(101,1,'Deluxe Garden Room',140,2,'Available',['King bed','Garden view','Rain shower']),
      R(102,1,'Deluxe Garden Room',140,2,'Occupied',['King bed','Garden view','Rain shower']),
      R(103,1,'Garden Family Room',185,4,'Available',['2 queen beds','Patio','Kitchenette']),
      R(104,1,'Garden Family Room',185,4,'Cleaning',['2 queen beds','Patio','Kitchenette']),
      R(105,1,'Deluxe Garden Room',140,2,'Available',['King bed','Garden view','Rain shower']),
      R(106,1,'Garden Suite',210,3,'Available',['King bed','Sitting area','Soaking tub']),
      R(201,2,'Terrace Room',165,2,'Available',['King bed','Private terrace','Espresso bar']),
      R(202,2,'Terrace Room',165,2,'Available',['King bed','Private terrace','Espresso bar']),
      R(203,2,'Terrace Deluxe',195,3,'Available',['King bed','Large terrace','Soaking tub']),
      R(204,2,'Terrace Deluxe',195,3,'Available',['King bed','Large terrace','Soaking tub']),
      R(205,2,'Terrace Room',165,2,'Maintenance',['King bed','Private terrace','Espresso bar']),
      R(206,2,'Terrace Family Suite',240,5,'Available',['2 bedrooms','Terrace','Living room']),
      R(301,3,'Executive Suite',320,3,'Occupied',['King bed','Balcony','Lounge','Butler']),
      R(302,3,'Executive Suite',320,3,'Available',['King bed','Balcony','Lounge','Butler']),
      R(303,3,'Skyline Suite',420,4,'Available',['Panoramic view','Jacuzzi','Dining area','Butler']),
      R(304,3,'Penthouse Suite',650,5,'Available',['Rooftop terrace','Private chef','Jacuzzi','Butler'])
    ];
    const G=(id,f,l,email,phone,notes,vip)=>({id,firstName:f,lastName:l,email,phone,notes,vip});
    const guests=[
      G('g1','Evelyn','Vance','evelyn.vance@example.com','+1 (555) 349-8291','Prefers quiet rooms. Loves evening herbal tea.',true),
      G('g2','Marcus','Okafor','m.okafor@example.com','+234 802 555 0147','Early check-in requested. Allergic to feathers.',false),
      G('g3','Sofia','Ramirez','sofia.ramirez@example.com','+34 612 555 019','Celebrating anniversary. Sparkling water lover.',true),
      G('g4','Liam','Chen','liam.chen@example.com','+1 (555) 201-4478','Business traveler, needs late checkout.',false),
      G('g5','Amara','Nkemelu','amara.n@example.com','+237 677 555 210','Vegetarian. Interested in spa packages.',false),
      G('g6','Henrik','Larsson','henrik.l@example.com','+46 70 555 12 34','High floor preference.',false)
    ];
    const V=(id,guestId,roomId,a,b,g,status,notes)=>({id,guestId,roomId,checkIn:a,checkOut:b,guests:g,status,notes});
    const reservations=[
      V('RES-1001','g1','r301',plus(t,-2),plus(t,1),2,'checked_in','Anniversary stay, quiet room.'),
      V('RES-1002','g2','r203',t,plus(t,3),2,'confirmed','Early check-in if possible.'),
      V('RES-1003','g4','r102',plus(t,-1),t,1,'checked_in','Late checkout requested.'),
      V('RES-1004','g3','r304',plus(t,2),plus(t,5),2,'confirmed','Champagne on arrival.'),
      V('RES-1005','g5','r104',plus(t,-6),plus(t,-3),3,'checked_out',''),
      V('RES-1006','g6','r202',plus(t,-10),plus(t,-7),2,'checked_out',''),
      V('RES-1007','g2','r201',plus(t,4),plus(t,6),2,'cancelled','Cancelled by guest.'),
      V('RES-1008','g5','r105',t,plus(t,2),2,'confirmed','')
    ];
    const S=(id,name,desc,price,duration)=>({id,name,desc,price,duration});
    const services=[
      S('s1','Signature Aura Massage','60-minute full-body massage with warm botanical oils.',120,'60 min'),
      S('s2','Thermal Spa Circuit','Sauna, steam room and hydrotherapy pools.',55,'2 hrs'),
      S('s3',"Chef's Tasting Dinner",'Seven-course seasonal menu with wine pairing.',160,'2.5 hrs'),
      S('s4','Sunrise Garden Yoga','Guided yoga session in the walled garden.',30,'45 min'),
      S('s5','Private Airport Transfer','Chauffeured sedan to or from the airport.',85,'1 hr'),
      S('s6','Couples Aromatherapy Ritual','Side-by-side treatments with a champagne finish.',260,'90 min')
    ];
    const serviceBookings=[
      {id:'SB-2001',serviceId:'s1',reservationId:'RES-1001',date:t,time:'15:00',guests:1,price:120,status:'confirmed'},
      {id:'SB-2002',serviceId:'s3',reservationId:'RES-1001',date:t,time:'19:30',guests:2,price:320,status:'confirmed'},
      {id:'SB-2003',serviceId:'s5',reservationId:'RES-1002',date:t,time:'11:00',guests:2,price:170,status:'confirmed'},
      {id:'SB-2004',serviceId:'s2',reservationId:'RES-1005',date:plus(t,-4),time:'16:00',guests:3,price:165,status:'completed'}
    ];
    const invoices=[
      {id:'INV-3001',reservationId:'RES-1005',issueDate:plus(t,-3),status:'paid',payments:[]},
      {id:'INV-3002',reservationId:'RES-1006',issueDate:plus(t,-7),status:'issued',payments:[]}
    ];
    const RV=(id,reservationId,guestName,roomNumber,rating,comment,date)=>({id,reservationId,guestName,roomNumber,rating,comment,date});
    const reviews=[
      RV('rv1','RES-1005','Amara Nkemelu','104',5,'The garden family room felt like a private cottage. The spa circuit was the highlight for the whole family.',plus(t,-3)),
      RV('rv2','RES-1006','Henrik Larsson','202',5,'Quiet terrace and a wonderful breakfast. Staff remembered my preferences from the first morning.',plus(t,-7)),
      RV('rv3',null,'Dr. Evelyn Vance','301',5,'The quiet balcony room and evening tea made our anniversary unforgettable.',plus(t,-30)),
      RV('rv4',null,'Daniel Moreau','206',5,'Impeccable service, and the family suite was spacious and thoughtfully designed.',plus(t,-45)),
      RV('rv5',null,'Priya Natarajan','203',4,'Lovely stay. Check-in was a little slow but the massage more than made up for it.',plus(t,-60)),
      RV('rv6',null,'Tobias Weber','303',5,'The skyline suite views at night are something special. We will be back.',plus(t,-80))
    ];
    return {rooms,guests,reservations,services,serviceBookings,invoices,reviews,counters:{res:1008,guest:6,sb:2004,inv:3002,rev:6}};
  }

  let db;
  const ui={tab:'dashboard',floor:'all',rstatus:'all',resf:'all',invf:'all',q:'',gq:'',room:null,fromRes:false,rating:5};

  function fixPayments(){
    db.invoices.forEach(i=>{
      if(i.status==='paid'&&!i.payments.length) i.payments.push({amount:folio(i.reservationId).total,method:'Credit Card',date:i.issueDate});
    });
  }
  function load(){
    try{const raw=localStorage.getItem(KEY);if(raw){db=JSON.parse(raw);return}}catch(e){}
    db=seed();fixPayments();save();
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}}

  const room=id=>db.rooms.find(r=>r.id===id);
  const guest=id=>db.guests.find(g=>g.id===id);
  const res=id=>db.reservations.find(r=>r.id===id);
  const svc=id=>db.services.find(s=>s.id===id);
  const gName=g=>g?`${g.firstName} ${g.lastName}`:'Unknown guest';
  const initials=g=>((g.firstName[0]||'')+(g.lastName[0]||'')).toUpperCase();
  const active=r=>r.status==='confirmed'||r.status==='checked_in';
  const paid=i=>i.payments.reduce((s,p)=>s+p.amount,0);

  function folio(resId){
    const r=res(resId);
    if(!r) return {lines:[],subtotal:0,tax:0,total:0};
    const rm=room(r.roomId);
    const n=Math.max(1,nights(r.checkIn,r.checkOut));
    const lines=[{desc:`Room ${rm.number} — ${rm.type}`,detail:`${plural(n,'night')} × ${money(rm.rate)}`,amount:n*rm.rate}];
    db.serviceBookings.filter(b=>b.reservationId===resId&&b.status!=='cancelled').forEach(b=>{
      const s=svc(b.serviceId);
      lines.push({desc:s?s.name:'Service',detail:`${dShort(b.date)} · ${plural(b.guests,'guest')}`,amount:b.price});
    });
    const subtotal=lines.reduce((s,l)=>s+l.amount,0);
    const tax=Math.round(subtotal*TAX*100)/100;
    return {lines,subtotal,tax,total:subtotal+tax};
  }
  function ensureInvoice(resId){
    let inv=db.invoices.find(i=>i.reservationId===resId);
    if(!inv){
      db.counters.inv+=1;
      inv={id:`INV-${db.counters.inv}`,reservationId:resId,issueDate:today(),status:'draft',payments:[]};
      db.invoices.push(inv);save();
    }
    return inv;
  }
  function isFree(roomId,a,b){
    return !db.reservations.some(r=>r.roomId===roomId&&active(r)&&overlaps(a,b,r.checkIn,r.checkOut));
  }

  function toast(msg,type='success'){
    const el=document.createElement('div');
    el.className='toast '+type;el.textContent=msg;
    $('toasts').appendChild(el);
    setTimeout(()=>{el.style.transition='.3s';el.style.opacity='0';setTimeout(()=>el.remove(),320)},3200);
  }

  function modal(title,sub,body,foot,opts={}){
    const o=$('overlay');
    o.innerHTML=`<form class="modal ${opts.wide?'wide':''}" ${opts.form?`data-form="${opts.form}"`:''} novalidate>
      <div class="mh"><div><h3>${title}</h3><p>${sub}</p></div>
        <div class="x">${opts.print?`<button type="button" class="btn sm ghost no-print" data-a="print">${ic('printer')}Print</button>`:''}
        <button type="button" class="btn icon sm no-print" data-a="close" aria-label="Close">${ic('x')}</button></div></div>
      <div class="mb">${body}</div>
      <div class="mf no-print">${foot}</div></form>`;
    o.classList.add('open');
  }
  function closeModal(){$('overlay').classList.remove('open');$('overlay').innerHTML=''}

  function renderBadges(){
    $$('.count[data-count]').forEach(c=>{
      c.textContent=c.dataset.count==='rooms'?db.rooms.filter(r=>r.status==='Available').length:db.reservations.filter(active).length;
    });
  }

  function renderDashboard(){
    const t=today();
    const occ=db.rooms.filter(r=>r.status==='Occupied').length;
    $('stOcc').textContent=db.rooms.length?Math.round(occ/db.rooms.length*100)+'%':'0%';
    $('stOccD').textContent=`${occ} of ${db.rooms.length} rooms occupied`;
    const arr=db.reservations.filter(r=>r.checkIn===t&&active(r));
    const dep=db.reservations.filter(r=>r.checkOut===t&&(r.status==='checked_in'||r.status==='checked_out'));
    $('stIn').textContent=arr.length;
    $('stOut').textContent=dep.length;
    $('stSvc').textContent=db.serviceBookings.filter(b=>b.date===t&&b.status!=='cancelled').length;

    const items=[...arr.map(r=>({type:'in',r,time:'14:00'})),...dep.map(r=>({type:'out',r,time:'11:00'}))].sort((a,b)=>a.time.localeCompare(b.time));
    $('schedule').innerHTML=items.length?items.map(({type,r,time})=>{
      const g=guest(r.guestId),rm=room(r.roomId);
      let act;
      if(type==='in') act=r.status==='confirmed'?`<button class="btn sm primary" data-a="checkIn" data-id="${r.id}">Check in</button>`:pill('checked_in');
      else act=r.status==='checked_in'?`<button class="btn sm ghost" data-a="checkOut" data-id="${r.id}">Check out</button>`:pill('checked_out');
      return `<div class="row">
        <div class="when ${type}"><small>${type==='in'?'Arrive':'Depart'}</small><span>${time}</span></div>
        <div class="grow"><b>${esc(gName(g))}${g&&g.vip?'<span class="vip">VIP</span>':''}</b>
          <span class="muted">Room ${esc(rm.number)} · ${esc(rm.type)} · ${plural(r.guests,'guest')}</span></div>
        <div>${act}</div></div>`;
    }).join(''):'<div class="empty">Nothing scheduled for today.</div>';

    $('chips').innerHTML=db.rooms.map(r=>`<button class="chip ${r.status.toLowerCase()}" title="${esc(r.type)} — ${r.status}" data-a="room" data-id="${r.id}">${esc(r.number)}<i></i></button>`).join('');

    const rv=db.reviews.slice().sort((a,b)=>b.date.localeCompare(a.date))[0];
    $('quote').innerHTML=rv?`${ic('quote')}<div><p>“${esc(rv.comment)}”</p><small>— ${esc(rv.guestName)} · Room ${esc(rv.roomNumber)}</small></div>`:'<p>No reviews yet.</p>';
  }

  function renderRooms(){
    const q=ui.q.toLowerCase();
    const list=db.rooms.filter(r=>(ui.floor==='all'||String(r.floor)===ui.floor)&&(ui.rstatus==='all'||r.status===ui.rstatus)&&
      (!q||r.number.includes(q)||r.type.toLowerCase().includes(q)||r.amenities.join(' ').toLowerCase().includes(q)));
    $('rooms').innerHTML=list.length?list.map(r=>`<div class="card">
      <div class="card-h"><b>${esc(r.number)}</b>${pill(r.status)}</div>
      <div class="card-b">
        <div><h3>${esc(r.type)}</h3><span class="muted">Floor ${r.floor} · Up to ${r.capacity} guests</span></div>
        <div class="tags">${r.amenities.map(a=>`<span>${esc(a)}</span>`).join('')}</div>
        <div class="foot"><div><div class="price">${money(r.rate)}</div><span class="muted">per night</span></div>
          <button class="btn sm ghost" data-a="room" data-id="${r.id}">Manage</button></div>
      </div></div>`).join(''):'<div class="empty">No rooms match these filters.</div>';
  }

  function renderReservations(){
    const q=ui.q.toLowerCase();
    let list=db.reservations.filter(r=>ui.resf==='all'||r.status===ui.resf);
    if(q) list=list.filter(r=>{
      const rm=room(r.roomId);
      return r.id.toLowerCase().includes(q)||gName(guest(r.guestId)).toLowerCase().includes(q)||rm.number.includes(q)||rm.type.toLowerCase().includes(q);
    });
    list.sort((a,b)=>b.checkIn.localeCompare(a.checkIn));
    $('resBody').innerHTML=list.length?list.map(r=>{
      const rm=room(r.roomId),n=nights(r.checkIn,r.checkOut);
      let acts=`<button class="btn sm ghost" data-a="folio" data-id="${r.id}">Folio</button>`;
      if(r.status==='confirmed') acts=`<button class="btn sm primary" data-a="checkIn" data-id="${r.id}">Check in</button><button class="btn sm ghost" data-a="cancel" data-id="${r.id}">Cancel</button>`+acts;
      else if(r.status==='checked_in') acts=`<button class="btn sm primary" data-a="checkOut" data-id="${r.id}">Check out</button>`+acts;
      return `<tr>
        <td><b>${esc(r.id)}</b></td>
        <td>${esc(gName(guest(r.guestId)))}</td>
        <td>${dShort(r.checkIn)} → ${dShort(r.checkOut)}<br><span class="muted">${plural(n,'night')}</span></td>
        <td>Room ${esc(rm.number)}<br><span class="muted">${esc(rm.type)}</span></td>
        <td>${r.guests}</td><td>${pill(r.status)}</td><td>${money(folio(r.id).total)}</td>
        <td><div class="acts">${acts}</div></td></tr>`;
    }).join(''):'<tr><td colspan="8" class="empty">No reservations found.</td></tr>';
  }

  function renderGuests(){
    const q=(ui.gq||ui.q).toLowerCase();
    const list=db.guests.filter(g=>!q||gName(g).toLowerCase().includes(q)||g.email.toLowerCase().includes(q)||g.phone.toLowerCase().includes(q));
    $('guests').innerHTML=list.length?list.map(g=>`<div class="card"><div class="card-b" style="gap:14px">
      <div style="display:flex;align-items:center;gap:14px"><div class="avatar">${esc(initials(g))}</div>
        <div><h3>${esc(gName(g))}</h3>${g.vip?'<span class="vip">VIP</span>':''}</div></div>
      <div class="contact"><div>${ic('mail')}${esc(g.email)}</div><div>${ic('phone')}${esc(g.phone)}</div></div>
      ${g.notes?`<div class="note">${esc(g.notes)}</div>`:''}</div></div>`).join(''):'<div class="empty">No guests found.</div>';
  }

  function renderServices(){
    $('svcs').innerHTML=db.services.map(s=>`<div class="card"><div class="card-b">
      <h3 style="font-family:var(--serif);font-size:1.1rem">${esc(s.name)}</h3>
      <p class="muted" style="font-size:.82rem;flex:1">${esc(s.desc)}</p>
      <div class="foot"><div><div class="price">${money(s.price)}</div><span class="muted">${esc(s.duration)} · per guest</span></div>
        <button class="btn sm ghost" data-a="bookSvc" data-id="${s.id}">Book</button></div></div></div>`).join('');
    const q=ui.q.toLowerCase();
    let list=db.serviceBookings.slice().sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
    if(q) list=list.filter(b=>{
      const s=svc(b.serviceId),r=res(b.reservationId),g=r&&guest(r.guestId);
      return (s&&s.name.toLowerCase().includes(q))||(g&&gName(g).toLowerCase().includes(q))||b.id.toLowerCase().includes(q);
    });
    $('svcBody').innerHTML=list.length?list.map(b=>{
      const s=svc(b.serviceId),r=res(b.reservationId);
      return `<tr><td><b>${esc(b.id)}</b></td><td>${esc(s?s.name:'Service')}</td>
        <td>${esc(gName(r&&guest(r.guestId)))}<br><span class="muted">${esc(b.reservationId)}</span></td>
        <td>${dShort(b.date)} · ${esc(b.time)}</td><td>${b.guests}</td><td>${money(b.price)}</td><td>${pill(b.status)}</td></tr>`;
    }).join(''):'<tr><td colspan="7" class="empty">No service bookings yet.</td></tr>';
  }

  function renderInvoices(){
    const q=ui.q.toLowerCase();
    let list=db.invoices.filter(i=>ui.invf==='all'||(ui.invf==='issued'?(i.status==='issued'||i.status==='draft'):i.status===ui.invf));
    if(q) list=list.filter(i=>i.id.toLowerCase().includes(q)||i.reservationId.toLowerCase().includes(q)||gName(guest(res(i.reservationId).guestId)).toLowerCase().includes(q));
    list.sort((a,b)=>b.issueDate.localeCompare(a.issueDate));
    $('invBody').innerHTML=list.length?list.map(i=>`<tr>
      <td><b>${esc(i.id)}</b></td><td>${esc(i.reservationId)}</td>
      <td>${esc(gName(guest(res(i.reservationId).guestId)))}</td><td>${dLong(i.issueDate)}</td>
      <td>${pill(i.status)}</td><td>${money(folio(i.reservationId).total)}</td><td>${money(paid(i))}</td>
      <td><div class="acts"><button class="btn sm ghost" data-a="invoice" data-id="${i.id}">View</button></div></td></tr>`).join('')
      :'<tr><td colspan="8" class="empty">No invoices found.</td></tr>';
  }

  function renderReviews(){
    const total=db.reviews.length;
    const avg=total?db.reviews.reduce((s,r)=>s+r.rating,0)/total:0;
    const full=Math.round(avg);
    $('avg').textContent=avg.toFixed(1);
    $('avgStars').textContent='★'.repeat(full)+'☆'.repeat(5-full);
    $('revCount').textContent=`Based on ${plural(total,'review')}`;
    $('bars').innerHTML=[5,4,3,2,1].map(n=>{
      const c=db.reviews.filter(r=>r.rating===n).length;
      return `<div class="bar-row"><span>${n} ★</span><div class="track"><i style="width:${total?c/total*100:0}%"></i></div><span class="muted">${c}</span></div>`;
    }).join('');
    const q=ui.q.toLowerCase();
    const list=db.reviews.filter(r=>!q||r.guestName.toLowerCase().includes(q)||r.comment.toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date));
    $('reviews').innerHTML=list.length?list.map(r=>`<article class="review">
      <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <p>“${esc(r.comment)}”</p>
      <footer><b>${esc(r.guestName)} · Room ${esc(r.roomNumber)}</b><span class="muted">${dLong(r.date)}</span></footer></article>`).join(''):'<div class="empty">No reviews found.</div>';
  }

  function renderAll(){
    renderBadges();renderDashboard();renderRooms();renderReservations();renderGuests();renderServices();renderInvoices();renderReviews();
  }

  function switchTab(tab){
    const t=TABS.find(x=>x[0]===tab);
    if(!t) return;
    ui.tab=tab;
    $$('.view').forEach(v=>v.classList.toggle('on',v.id==='view-'+tab));
    $$('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.id===tab));
    $('title').textContent=t[3];
    $('sub').textContent=t[4];
    window.scrollTo({top:0});
  }

  function buildNav(){
    $('nav').innerHTML=TABS.map(t=>`<button data-a="tab" data-id="${t[0]}" title="${t[2]}" aria-label="${t[2]}">${ic(t[1])}<span>${t[2]}</span>${
      t[0]==='rooms'?'<em class="count" data-count="rooms" style="font-style:normal"></em>':t[0]==='reservations'?'<em class="count hot" data-count="res" style="font-style:normal"></em>':''}</button>`).join('');
  }

  function guestOptions(sel){
    return '<option value="">Select guest</option>'+db.guests.map(g=>`<option value="${g.id}" ${g.id===sel?'selected':''}>${esc(gName(g))}${g.vip?' ★':''}</option>`).join('');
  }

  function resModal(roomId,guestId){
    const t=today();
    modal('New reservation','Reserve a sanctuary for a guest',`
      <div class="f"><label>Guest</label><div class="inline">
        <select class="inp" id="rGuest">${guestOptions(guestId)}</select>
        <button type="button" class="btn sm ghost" data-a="newGuestFromRes">+ New</button></div></div>
      <div class="fr">
        <div class="f"><label>Check-in</label><input type="date" class="inp" id="rIn" value="${t}" min="${t}"></div>
        <div class="f"><label>Check-out</label><input type="date" class="inp" id="rOut" value="${plus(t,1)}" min="${plus(t,1)}"></div>
      </div>
      <div class="fr">
        <div class="f"><label>Room</label><select class="inp" id="rRoom"></select></div>
        <div class="f"><label>Guests</label><input type="number" class="inp" id="rGuests" min="1" max="5" value="2"></div>
      </div>
      <div class="f"><label>Special requests</label><textarea class="inp" id="rNotes" rows="2" placeholder="Anniversary, quiet room, extra pillows"></textarea></div>
      <div class="calc"><div><span>Duration</span><b id="cN">0 nights</b></div><div><span>Nightly rate</span><b id="cR">$0.00</b></div><div class="tot"><span>Room subtotal</span><span id="cT">$0.00</span></div></div>`,
      `<button type="button" class="btn ghost" data-a="close">Cancel</button><button type="submit" class="btn primary">Create reservation</button>`,{form:'res'});
    roomOptions(roomId);
  }

  function roomOptions(pref){
    const a=$('rIn').value,b=$('rOut').value,n=parseInt($('rGuests').value,10)||1,sel=$('rRoom');
    const cur=pref||sel.value;
    if(!a||!b||b<=a){sel.innerHTML='<option value="">Pick valid dates</option>';return calc()}
    const av=db.rooms.filter(r=>r.status!=='Maintenance'&&r.capacity>=n&&isFree(r.id,a,b));
    sel.innerHTML=av.length?av.map(r=>`<option value="${r.id}">Room ${esc(r.number)} — ${esc(r.type)} (${money(r.rate)})</option>`).join(''):'<option value="">No rooms available</option>';
    if(cur&&av.some(r=>r.id===cur)) sel.value=cur;
    calc();
  }
  function calc(){
    const a=$('rIn').value,b=$('rOut').value,rm=room($('rRoom').value);
    const n=a&&b&&b>a?nights(a,b):0;
    $('cN').textContent=plural(n,'night');
    $('cR').textContent=money(rm?rm.rate:0);
    $('cT').textContent=money(rm?rm.rate*n:0);
  }

  function guestModal(fromRes){
    ui.fromRes=fromRes;
    modal('Register guest','Add a profile to the guest directory',`
      <div class="fr"><div class="f"><label>First name</label><input class="inp" id="gF" required></div>
        <div class="f"><label>Last name</label><input class="inp" id="gL" required></div></div>
      <div class="fr"><div class="f"><label>Email</label><input type="email" class="inp" id="gE" required></div>
        <div class="f"><label>Phone</label><input type="tel" class="inp" id="gP" required></div></div>
      <div class="f"><label>Preferences / VIP notes</label><input class="inp" id="gN" placeholder="High floor, sparkling water"></div>`,
      `<button type="button" class="btn ghost" data-a="close">Cancel</button><button type="submit" class="btn primary">Save guest</button>`,{form:'guest'});
    setTimeout(()=>$('gF').focus(),50);
  }

  function roomModal(id){
    const r=room(id);if(!r) return;
    ui.room=id;
    const occ=db.reservations.find(x=>x.roomId===id&&x.status==='checked_in');
    const g=occ&&guest(occ.guestId);
    modal(`Room ${esc(r.number)}`,`${esc(r.type)} · Floor ${r.floor}`,`
      <div class="meta3"><div><small>Rate</small><b>${money(r.rate)}</b></div><div><small>Capacity</small><b>${r.capacity} guests</b></div><div><small>Status</small>${pill(r.status)}</div></div>
      <div class="f" style="margin-top:18px"><label>Update status</label><div class="setstatus">
        <button type="button" class="s-available" data-a="setStatus" data-id="Available">Mark available</button>
        <button type="button" class="s-occupied" data-a="setStatus" data-id="Occupied">Mark occupied</button>
        <button type="button" class="s-cleaning" data-a="setStatus" data-id="Cleaning">Send to cleaning</button>
        <button type="button" class="s-maintenance" data-a="setStatus" data-id="Maintenance">Maintenance</button></div></div>
      <div class="f"><label>Amenities</label><div class="tags">${r.amenities.map(a=>`<span>${esc(a)}</span>`).join('')}</div></div>
      ${occ?`<div class="f"><label>Current resident</label><div class="row"><div class="avatar" style="width:38px;height:38px;font-size:.8rem">${esc(initials(g))}</div>
        <div class="grow"><b>${esc(gName(g))}</b><span class="muted">${occ.id} · ${dShort(occ.checkIn)} → ${dShort(occ.checkOut)}</span></div></div></div>`:''}`,
      `<button type="button" class="btn ghost" data-a="close">Close</button><button type="button" class="btn primary" data-a="bookRoom" ${r.status==='Maintenance'?'disabled':''}>Book this room</button>`);
  }

  function svcModal(serviceId){
    const act=db.reservations.filter(active);
    const t=today();
    modal('Book a service','Curate a moment for our guest',`
      <div class="f"><label>Experience</label><select class="inp" id="sSel">${db.services.map(s=>`<option value="${s.id}" ${s.id===serviceId?'selected':''}>${esc(s.name)} — ${money(s.price)}</option>`).join('')}</select></div>
      <div class="f"><label>Reservation</label><select class="inp" id="sRes">${act.length?act.map(r=>`<option value="${r.id}">${r.id} — ${esc(gName(guest(r.guestId)))} (Room ${esc(room(r.roomId).number)})</option>`).join(''):'<option value="">No active reservations</option>'}</select></div>
      <div class="fr"><div class="f"><label>Date</label><input type="date" class="inp" id="sDate" value="${t}" min="${t}"></div>
        <div class="f"><label>Time</label><input type="time" class="inp" id="sTime" value="15:00"></div></div>
      <div class="fr"><div class="f"><label>Guests</label><input type="number" class="inp" id="sGuests" min="1" max="6" value="1"></div>
        <div class="f"><label>Total</label><div class="price" id="sPrice" style="padding-top:4px">$0.00</div></div></div>`,
      `<button type="button" class="btn ghost" data-a="close">Cancel</button><button type="submit" class="btn primary">Confirm booking</button>`,{form:'svc'});
    svcPrice();
  }
  function svcPrice(){
    const s=svc($('sSel').value),n=parseInt($('sGuests').value,10)||1;
    $('sPrice').textContent=money(s?s.price*n:0);
  }

  function invoiceModal(invId){
    const inv=db.invoices.find(i=>i.id===invId);if(!inv) return;
    const r=res(inv.reservationId),g=guest(r.guestId),rm=room(r.roomId),f=folio(inv.reservationId);
    const p=paid(inv),bal=Math.max(0,Math.round((f.total-p)*100)/100);
    const body=`
      <div class="folio-h"><div><b>Aura Grand Hotel & Spa</b><div class="muted">Guest folio · ${esc(inv.id)}</div></div>
        <div style="text-align:right">${pill(inv.status)}<div class="muted" style="margin-top:6px">Issued ${dLong(inv.issueDate)}</div></div></div>
      <div class="folio-2">
        <div><h4>Billed to</h4><b>${esc(gName(g))}</b><div class="muted">${esc(g.email)}<br>${esc(g.phone)}</div></div>
        <div><h4>Stay</h4><b>${esc(r.id)} · Room ${esc(rm.number)}</b><div class="muted">${dLong(r.checkIn)} → ${dLong(r.checkOut)}<br>${esc(rm.type)}</div></div>
      </div>
      <div class="tablewrap" style="box-shadow:none;margin-bottom:18px"><table class="folio-t">
        <thead><tr><th>Description</th><th>Details</th><th class="r">Amount</th></tr></thead>
        <tbody>${f.lines.map(l=>`<tr><td>${esc(l.desc)}</td><td>${esc(l.detail)}</td><td class="r">${money(l.amount)}</td></tr>`).join('')}</tbody></table></div>
      <div class="calc totals">
        <div><span>Subtotal</span><span>${money(f.subtotal)}</span></div>
        <div><span>Tax (${TAX*100}%)</span><span>${money(f.tax)}</span></div>
        <div><span>Paid</span><span>− ${money(p)}</span></div>
        <div class="tot"><span>Balance due</span><span>${money(bal)}</span></div></div>
      ${inv.payments.length?`<div class="folio-pay" style="margin-top:18px"><h4>Payments</h4>${inv.payments.map(x=>`<div class="muted">${dLong(x.date)} · ${esc(x.method)} · ${money(x.amount)}</div>`).join('')}</div>`:''}`;
    let foot=`<button type="button" class="btn ghost" data-a="close">Close</button>`;
    if(bal>0&&inv.status!=='draft') foot+=`<select class="inp pay-select" id="payMethod"><option>Credit Card</option><option>Cash</option><option>Bank Transfer</option><option>Mobile Money</option></select>
      <button type="button" class="btn primary" data-a="pay" data-id="${inv.id}">Record payment (${money(bal)})</button>`;
    else if(bal>0) foot+=`<button type="button" class="btn primary" data-a="issue" data-id="${inv.id}">Issue invoice</button>`;
    modal('Hotel folio','Official guest billing summary',body,foot,{wide:true,print:true});
  }

  function reviewModal(){
    const done=new Set(db.reviews.map(r=>r.reservationId).filter(Boolean));
    const stays=db.reservations.filter(r=>r.status==='checked_out'&&!done.has(r.id));
    ui.rating=5;
    modal('Record a review','Preserve genuine guest impressions',`
      <div class="f"><label>Completed stay</label><select class="inp" id="vRes">${stays.length?stays.map(r=>`<option value="${r.id}">${r.id} — ${esc(gName(guest(r.guestId)))} (Room ${esc(room(r.roomId).number)})</option>`).join(''):'<option value="">No stays awaiting a review</option>'}</select></div>
      <div class="f"><label>Rating</label><div class="starpick" id="stars">${[1,2,3,4,5].map(n=>`<button type="button" class="on" data-a="star" data-id="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>
      <div class="f"><label>Feedback</label><textarea class="inp" id="vText" rows="3" placeholder="What made the stay memorable?"></textarea></div>`,
      `<button type="button" class="btn ghost" data-a="close">Cancel</button><button type="submit" class="btn primary">Save review</button>`,{form:'review'});
  }

  const forms={
    res(){
      const guestId=$('rGuest').value,roomId=$('rRoom').value,a=$('rIn').value,b=$('rOut').value,n=parseInt($('rGuests').value,10);
      if(!guestId) return toast('Please select a guest.','info');
      if(!roomId) return toast('Please select an available room.','info');
      if(b<=a) return toast('Check-out must be after check-in.','info');
      const rm=room(roomId);
      if(n>rm.capacity) return toast(`Room ${rm.number} sleeps up to ${rm.capacity}.`,'info');
      if(!isFree(roomId,a,b)) return toast('That room is no longer free for these dates.','info');
      db.counters.res+=1;
      const r={id:`RES-${db.counters.res}`,guestId,roomId,checkIn:a,checkOut:b,guests:n,status:'confirmed',notes:$('rNotes').value.trim()};
      db.reservations.push(r);save();closeModal();renderAll();
      toast(`${r.id} confirmed for ${gName(guest(guestId))}.`);
    },
    guest(){
      const email=$('gE').value.trim();
      if(!$('gF').value.trim()||!$('gL').value.trim()||!email||!$('gP').value.trim()) return toast('Please fill in all required fields.','info');
      if(db.guests.some(g=>g.email.toLowerCase()===email.toLowerCase())) return toast('A guest with this email already exists.','info');
      db.counters.guest+=1;
      const notes=$('gN').value.trim();
      const g={id:`g${db.counters.guest}`,firstName:$('gF').value.trim(),lastName:$('gL').value.trim(),email,phone:$('gP').value.trim(),notes,vip:/vip/i.test(notes)};
      db.guests.push(g);save();renderAll();
      if(ui.fromRes) resModal(null,g.id); else closeModal();
      toast(`${gName(g)} added to the directory.`);
    },
    svc(){
      const s=svc($('sSel').value),resId=$('sRes').value;
      if(!s||!resId) return toast('Choose a service and an active reservation.','info');
      const n=parseInt($('sGuests').value,10)||1;
      db.counters.sb+=1;
      const b={id:`SB-${db.counters.sb}`,serviceId:s.id,reservationId:resId,date:$('sDate').value,time:$('sTime').value,guests:n,price:s.price*n,status:'confirmed'};
      db.serviceBookings.push(b);save();closeModal();renderAll();
      toast(`${s.name} booked for ${dShort(b.date)} at ${b.time}.`);
    },
    review(){
      const r=res($('vRes').value);
      if(!r) return toast('Select a completed stay to review.','info');
      const text=$('vText').value.trim();
      if(!text) return toast('Please add some feedback.','info');
      db.counters.rev+=1;
      db.reviews.push({id:`rv${db.counters.rev}`,reservationId:r.id,guestName:gName(guest(r.guestId)),roomNumber:room(r.roomId).number,rating:ui.rating,comment:text,date:today()});
      save();closeModal();renderAll();toast('Review saved. Thank you!');
    }
  };

  const actions={
    tab:id=>switchTab(id),
    close:closeModal,
    print:()=>window.print(),
    newRes:()=>resModal(),
    newGuest:()=>guestModal(false),
    newGuestFromRes:()=>guestModal(true),
    bookSvc:id=>svcModal(id),
    newReview:reviewModal,
    room:id=>roomModal(id),
    bookRoom:()=>resModal(ui.room),
    setStatus:id=>{
      const r=room(ui.room);if(!r) return;
      r.status=id;save();renderAll();roomModal(r.id);
      toast(`Room ${r.number} marked ${id.toLowerCase()}.`,'info');
    },
    checkIn:id=>{
      const r=res(id),rm=room(r.roomId);
      if(rm.status==='Maintenance') return toast(`Room ${rm.number} is under maintenance.`,'info');
      if(rm.status==='Occupied') return toast(`Room ${rm.number} is still occupied.`,'info');
      r.status='checked_in';rm.status='Occupied';save();renderAll();
      toast(`${gName(guest(r.guestId))} checked in to Room ${rm.number}. Welcome!`);
    },
    checkOut:id=>{
      const r=res(id);
      r.status='checked_out';room(r.roomId).status='Cleaning';
      const inv=ensureInvoice(id);
      if(inv.status==='draft') inv.status='issued';
      inv.issueDate=today();save();renderAll();
      toast(`Checked out. Invoice ${inv.id} issued.`);
      invoiceModal(inv.id);
    },
    cancel:id=>{
      if(!confirm(`Cancel reservation ${id}?`)) return;
      res(id).status='cancelled';save();renderAll();toast(`Reservation ${id} cancelled.`,'info');
    },
    folio:id=>{const inv=ensureInvoice(id);renderInvoices();invoiceModal(inv.id)},
    invoice:id=>invoiceModal(id),
    issue:id=>{
      const inv=db.invoices.find(i=>i.id===id);
      inv.status='issued';inv.issueDate=today();save();renderAll();invoiceModal(id);toast(`Invoice ${id} issued.`);
    },
    pay:id=>{
      const inv=db.invoices.find(i=>i.id===id);
      const bal=Math.round((folio(inv.reservationId).total-paid(inv))*100)/100;
      if(bal<=0) return;
      const m=$('payMethod')?$('payMethod').value:'Credit Card';
      inv.payments.push({amount:bal,method:m,date:today()});
      inv.status='paid';save();renderAll();invoiceModal(id);toast(`Payment of ${money(bal)} recorded.`);
    },
    star:id=>{
      ui.rating=Number(id);
      $$('#stars button').forEach(b=>b.classList.toggle('on',Number(b.dataset.id)<=ui.rating));
    },
    floor:(id,t)=>{ui.floor=id;setOn(t);renderRooms()},
    rstatus:(id,t)=>{ui.rstatus=id;setOn(t);renderRooms()},
    resf:(id,t)=>{ui.resf=id;setOn(t);renderReservations()},
    invf:(id,t)=>{ui.invf=id;setOn(t);renderInvoices()},
    reset:()=>{
      if(!confirm('Reset all data to the demo defaults?')) return;
      localStorage.removeItem(KEY);db=seed();fixPayments();save();renderAll();toast('Demo data restored.','info');
    }
  };
  function setOn(t){$$('[data-a="'+t.dataset.a+'"]',t.parentElement).forEach(x=>x.classList.toggle('on',x===t))}

  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-a]');
    if(t&&actions[t.dataset.a]) actions[t.dataset.a](t.dataset.id,t);
    else if(e.target===$('overlay')) closeModal();
  });
  document.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target.dataset.form;
    if(f&&forms[f]) forms[f]();
  });
  document.addEventListener('input',e=>{
    const id=e.target.id;
    if(id==='q'){
      ui.q=e.target.value.trim();
      if(ui.q&&ui.tab==='dashboard') switchTab('reservations');
      renderRooms();renderReservations();renderGuests();renderServices();renderInvoices();renderReviews();
    }else if(id==='gq'){ui.gq=e.target.value.trim();renderGuests()}
    else if(id==='sGuests') svcPrice();
  });
  document.addEventListener('change',e=>{
    const id=e.target.id;
    if(id==='rIn'){
      const next=plus($('rIn').value||today(),1);
      $('rOut').min=next;
      if($('rOut').value<=$('rIn').value) $('rOut').value=next;
      roomOptions();
    }else if(id==='rOut'||id==='rGuests') roomOptions();
    else if(id==='rRoom') calc();
    else if(id==='sSel') svcPrice();
  });
  document.addEventListener('keydown',e=>{
    const tag=(document.activeElement&&document.activeElement.tagName)||'';
    if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(tag)){e.preventDefault();$('q').focus()}
    else if(e.key==='Escape') closeModal();
  });

  load();
  buildNav();
  renderAll();
  switchTab('dashboard');
})();