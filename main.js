let rng = document.querySelector('#range');
let length = 5;

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let minimum = Math.min(innerWidth, innerHeight);
canvas.width = minimum/1.5;
canvas.height = minimum/1.5;

addEventListener('resize', () => {
	minimum = Math.min(innerWidth, innerHeight);
	canvas.width = minimum/1.5;
	canvas.height = minimum/1.5;
});
rng.addEventListener('change', () => {
	length = rng.value;
});

let s = new Shapes(ctx);

let axiom, theta, sentence;
let rules = [];
let translate;

function bush() {
	translate = new Vector2D(canvas.width/2, canvas.height);

	axiom = 'F';
	rules[0] = {
		a: 'F',
		b: 'FF+[+F-F-F]-[-F+F+F]'
	};
	theta = 22.5;

	sentence=axiom;

}
function crystal() {
	translate = new Vector2D(canvas.width, canvas.height);

	axiom = 'F+F+F+F';
	rules[0] = {
		a: 'F',
		b: 'FF+F++F+F'
	};
	theta = 90;

	sentence=axiom;
}
function QuadraticSnowflake() {
	translate = new Vector2D(canvas.width, canvas.height);

	axiom = 'FF+FF+FF+FF';
	rules[0] = {
		a: 'F',
		b: 'F+F-F-F+F'
	};
	theta = 90;

	sentence=axiom;
}
function Snowflake() {
	translate = new Vector2D(canvas.width-100, canvas.height);

	axiom = 'F++F++F';
	rules[0] = {
		a: 'F',
		b: 'F-F++F-F'
	};
	theta = 60;

	sentence=axiom;
}
function QuadraticKochIsland() {
	translate = new Vector2D(canvas.width-100, canvas.height-100);

	axiom = 'F+F+F+F';
	rules[0] = {
		a: 'F',
		b: 'F+F-F-FFF+F+F-F'
	};
	theta = 90;

	sentence=axiom;
}
function Pentaplexity() {
	translate = new Vector2D(canvas.width-100, canvas.height-100);

	axiom = 'F++F++F++F++F';
	rules[0] = {
		a: 'F',
		b: 'F++F++F|F-F++F'
	};
	theta = 36;

	sentence=axiom;
}
function turtle() {
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(translate.x, translate.y);
	
	for (let l = 0; l < sentence.length; l++) {
	
		let now = sentence.charAt(l);
		//console.log(now)
		if (now == 'F') {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -length);
			ctx.stroke();
			ctx.translate(0, -length);

		}else if (now == '+') {
			ctx.rotate(-theta*Math.PI/180);
		}else if (now == '-') {
			ctx.rotate(theta*Math.PI/180);
		}else if (now == '[') {
			ctx.save();
		}else if (now == ']') {
			ctx.restore();
		}else if (now == '|') {
			ctx.rotate(180*Math.PI/180);
		}
	}	
}
function generate() {
	//length = length/2;
	let newSentence = '';
	for (let i = 0; i < sentence.length; i++) {
		for (let j = 0; j < rules.length; j++) {
			if (sentence.charAt(i) == rules[j].a) {
				newSentence += rules[j].b;
			}else{
				newSentence += sentence.charAt(i);
			}
		}
		
	}
	//console.log(newSentence);
	sentence = newSentence;
	turtle();
}

addEventListener('keypress', (e) => {
	if (e.key == 'q') {
		generate();
	}
});
