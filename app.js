let mins = 25,
	total = 1500,
	left = 1500,
	h = null,
	sessions = 0
const t = document.getElementById('t'),
	fg = document.getElementById('fg'),
	s = document.getElementById('s'),
	C = 565.5
const p = n => String(n).padStart(2, '0')
function view() {
	t.textContent = p(Math.floor(left / 60)) + ':' + p(left % 60)
	fg.style.strokeDashoffset = C * (1 - left / total)
	document.title = t.textContent + ' — Pomodoro'
}
function label(a, ic) {
	s.querySelector('span').textContent = a
	s.querySelector('i').className = 'fa-solid ' + ic
}
function stop() {
	clearInterval(h)
	h = null
}
function beep() {
	try {
		const a = new (window.AudioContext || window.webkitAudioContext)(),
			o = a.createOscillator()
		o.connect(a.destination)
		o.frequency.value = 880
		o.start()
		setTimeout(() => o.stop(), 500)
	} catch (e) {}
}
s.onclick = () => {
	if (h) {
		stop()
		label('Davom etish', 'fa-play')
		return
	}
	label("To'xtatish", 'fa-pause')
	h = setInterval(() => {
		left--
		view()
		if (left <= 0) {
			stop()
			beep()
			if (mins === 25) {
				sessions++
				document.getElementById('done').textContent = sessions
			}
			left = total
			view()
			label('Boshlash', 'fa-play')
		}
	}, 1000)
}
document.getElementById('r').onclick = () => {
	stop()
	left = total
	view()
	label('Boshlash', 'fa-play')
}
document.querySelectorAll('#modes button').forEach(
	b =>
		(b.onclick = () => {
			document
				.querySelectorAll('#modes button')
				.forEach(x => x.classList.remove('on'))
			b.classList.add('on')
			stop()
			mins = +b.dataset.m
			total = left = mins * 60
			view()
			label('Boshlash', 'fa-play')
		}),
)
view()
