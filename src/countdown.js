const getRemainingTime = deadline => {
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24));
  
    return {
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays,
      remainTime
    }
  };
  
  const countdown = (deadline,elem,finalMessage) => {
    const el = document.getElementById(elem);
  
    const timerUpdate = setInterval( () => {
      let t = getRemainingTime(deadline);
      el.innerHTML = `                
      <p class="d-inline card p-1 ">${t.remainDays}d</p>
      <p class="d-inline card p-1 ">${t.remainHours}h</p>
      <p class="d-inline card p-1 ">${t.remainMinutes}m</p>
      <p class="d-inline card p-1 ">${t.remainSeconds}s</p>
      `;
  
      if(t.remainTime <= 1) {
        clearInterval(timerUpdate);
        el.innerHTML = finalMessage;
      }
  
    }, 1000)
  };
  
  countdown('Dec 18 2021 00:00:00 GMT-0500', 'clock', '¡Go!');
  countdown('Jun 18 2022 00:00:00 GMT-0500', 'clock2', '¡Go!');
  countdown('Jun 30 2022 00:00:00 GMT-0500', 'clock3', '¡Go!');
  