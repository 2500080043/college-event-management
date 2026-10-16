const defaultEvents = [
  {name:"Tech Fest 2026", date:"2026-11-12", venue:"Main Auditorium"},
  {name:"Cultural Night", date:"2026-11-20", venue:"Open Air Theatre"},
  {name:"Sports Meet", date:"2026-12-05", venue:"College Stadium"}
];

function getEvents(){
  const saved = localStorage.getItem("campusEvents");
  return saved ? JSON.parse(saved) : defaultEvents;
}
function saveEvents(events){ localStorage.setItem("campusEvents", JSON.stringify(events)); }

function renderUser(){
  const list=document.getElementById("eventList");
  if(!list) return;
  list.innerHTML="";
  getEvents().forEach((e,i)=>{
    list.innerHTML += `<article class="event-card">
      <h3>${e.name}</h3><p><b>Date:</b> ${e.date}</p><p><b>Venue:</b> ${e.venue}</p>
      <button onclick="registerEvent(${i})">Register</button>
    </article>`;
  });
}
function registerEvent(i){
  const e=getEvents()[i];
  document.getElementById("message").textContent=`Registration successful for ${e.name}!`;
}
function renderAdmin(){
  const list=document.getElementById("adminEventList");
  if(!list) return;
  list.innerHTML="";
  getEvents().forEach((e,i)=>{
    list.innerHTML += `<article class="event-card">
      <h3>${e.name}</h3><p>${e.date} · ${e.venue}</p>
      <button onclick="deleteEvent(${i})">Delete</button>
    </article>`;
  });
}
function deleteEvent(i){
  const events=getEvents();
  events.splice(i,1); saveEvents(events); renderAdmin();
}
document.getElementById("eventForm")?.addEventListener("submit",function(ev){
  ev.preventDefault();
  const events=getEvents();
  events.push({
    name:document.getElementById("eventName").value,
    date:document.getElementById("eventDate").value,
    venue:document.getElementById("eventVenue").value
  });
  saveEvents(events); this.reset(); renderAdmin();
});
renderUser(); renderAdmin();
