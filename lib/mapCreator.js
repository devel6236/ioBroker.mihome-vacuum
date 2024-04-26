const {
	createCanvas,
	Canvas
} = require('canvas');

const {
	Image
} = require('canvas');

// Farben ändern
const colors = {
	floor: '#23465e',
	obstacle: '#2b2e30',
	path: 'white',
	newmap: true
};
const orgcolors = [
	'#fcd451', //Gelb - Wohnzimmer
	'#91c8ff', //Blau - Medienzimmer
	'#c7ae00', //Dunkelgalb - Schlafzimmer
	'#fff7bf', //Koralle - Esszimmer
	'#f58e6f', //Hellgelb - Flur
	'#f3752c', //Orange - Badezimmer
	'#d1ff80', //Grün - Kueche
	'#434242', // wall
	'#dfdfdf' // desel floor
];
const offset = 60;

const robot = 'data:image/png;base64,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';
const robot1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAAHGjw8oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADbUExURQAAAICAgICAgICAgICAgICAgHx8fH19fX19fYCAgIGBgX5+foCAgH5+foCAgH9/f39/f35+foCAgH9/f39/f4CAgH5+foGBgYCAgICAgIGBgX9/f39/f35+foCAgH9/f39/f4CAgIODg4eHh4mJiZCQkJycnJ2dnZ6enqCgoKSkpKenp62trbGxsbKysry8vL29vcLCwsXFxcbGxsvLy87OztPT09XV1d/f3+Tk5Ojo6Ozs7O3t7e7u7vHx8fLy8vPz8/X19fb29vf39/j4+Pn5+f39/f7+/v///9yECocAAAAgdFJOUwAGChgcKCkzOT5PVWZnlJmfsLq7wcrS1Nre4OXz+vr7ZhJmqwAAAAlwSFlzAAAXEQAAFxEByibzPwAAAcpJREFUKFNlkolaWkEMhYPggliBFiwWhGOx3AqCsggI4lZt8/5P5ElmuEX5P5hMMjeZJBMRafCvUKnbIqpcioci96owTQWqP0QKC54nImUAyr9k7VD1me4YvibHlJKpVUzQhR+dmdTRSDUvdHh8NK8nhqUVch7cITmXA3rtYDmH+3OL4XI1T+BhJUcXczQxOBXJuve0/daeUr5A6g9muJzo5NI2kPKtyRSGBStKQZ5RC1hENWn6NSRTrDUqLD/lsNKoFTNRETlGMn9dDoGdoDcT1fHPi7EuUDD9dMBw4+6vMQVyInnPXDsdW+8tjWfbYTbzg/OstcagzSlb0+wL/6k+1KPhCrj6YFhzS5eXuHcYNF4bsGtDYhFLTOSMqTsx9e3iyKfynb1SK+RqtEq70RzZPwEGKwv7G0OK1QA42Y+HIgct9P3WWG9ItI/mQTgvoeuWAMdlTRclO/+Km2jwlhDvinGNbyJH6EWV84AJ1wl8JowejqTqTmv+0GqDmVLlg/wLX5Mp2rO3WRs2Zs5fznAVd1EzRh10OONr7hhhM4ctevhiVVxHdYsbq+JzHzaIfdjs5CZ9tGInSfoWEXuL7//fwtn9+Jp7wSryDjBFqnOGeuUxAAAAAElFTkSuQmCC';
const charger = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAdVBMVEUAAAA44Yo44Yo44Yo44Yo44Yo44Yo44Yo44Yp26q844Yr///9767Kv89DG9t2g8Md26q5C44/5/vvz/fjY+ei19NNV5ZtJ45T2/fmY78KP7r1v6atq6Kjs/PPi+u7e+uvM9+Gb8MSS7r+H7bhm6KVh56JZ5p3ZkKITAAAACnRSTlMABTr188xpJ4aepd0A4wAAANZJREFUKM9VklmCgzAMQwkQYCSmLKWl2+zL/Y9YcIUL7wvkJHIUJyKkVcyy+JIGCZILGF//QLEqlTmMdsBEXi56igfH/QVGqvXSu49+1KftCbn+dtxB5LOPfNGQNRaKaQNkTJ46OMGczZg8wJB/9TB+J3nFkyqJMp44vBrnWYhJJmOn/5uVzAotV/zACnbUtTbOpHcQzVx8kxw6mavdpYP90dsNcE5k6xd8RoIb2Xgk6xAbfm5C9NiHtxGiXD/U2P96UJunrS/LOeV2GG4wfBi241P5+NwBnAEUFx9FUdUAAAAASUVORK5CYII=';
const tank = 'data:image/png;base64,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';
const spaceship = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFMklEQVRYR+2YfUxVZRjAf+cAfiAOHZaIFxXD0g2V3LVipZFuOrRcm6KBHw0b/GHERpFGfoQokcV0M6x5mbiKyFK31NRls666RmUrP0gtUVQU8IP8AEGBe297zznXe+71fsBB+4v3D8Z97/M85/c+X+9zj8SDW7eBUJ25XsDdrpqXumpAp29jSoZMTDxsXCS2+wJNXbX/YAFTVsqMeg5WTO4GNBIZG90eNOI3l063B434zwK8oCnGkrISXRWfARzAT0CGEeNCp6ttppHIYWFExYIkQc4mCOsHeclw6wY01MC/taIXip5oaHUdMPmtMBa85/7w+jq4egX2bQRrWTegv9A00u1BQ6l7T6nbgx2tYiGXCsia7yqAKqAzHowFEjR9O1Cu9Um/Mewo4ETgQJAsYXc4cDi4CER3ErBGkjDJkoTNLvo3zwMHA2VYRwGFMaujLonk9D/Z9l29IcBZL0aatpY8iTRor+BKFId+oIDj48Opqm7m+s02Q4D9w0NMsTGhHD5y8+EAYhoJDZegpdEQIL37mogYDBdPPSTA9w9B+XKotBoDjEs0kboK3p3QacBSYIEuHyZ5JLCSg/gDnPkotLeqJuRgyN/veRfX4B9QFOKPOobPgYXOIjk8tFc/85LoZ8ms2iMqdSGwWSfsH3D+CpgRzkcrRioqb+efgoKD8INFPywEAkyTJam0OHYaa2p+5vydG78D4+8BxodFmnePnsuQX9Zhc9gDAV4CHgOuKXexBlhVIc4BsQkHPAEHAGeISxzsJ8RpQZJceuGZbKYf/5IjTfXugIBZ5zHvgJZTsHkJVOxwic5dCnMWKx50A7SchN2fwo71Ltn4qTB7ma8cTANEqjmXB2DUE2bS18OqaWC3eQfcdUtVbm50mQnti+jc9wHuvKkOsXrZM2dVPe9FkoYcVMryPVCSBbV/ewCaRppZVALLEvWAInHF64zRwIc4AZ14l8/DpdMqYN5MNq0TYvBa9nHI264CDh4BA4eqGseP6gEXix1xXK0gVcDVVvgkXbSigIBlQKvyELFCesL2K7oIALOjoKVJERGM92QdDtde7zD4plbVa9Ve1aREu/5XfrbQA5hnDHBLDfQJdwdzfkoeRG56JAW5jyNH7QWL5qGMsdhrk1ha+A+FJfWwtc5d32aDE5VwpwnykwwBVgLi2FMIADh8oIMRMaF8b73mBjg1cQCnq5s5e1nqCOA+IAo5KM53iEeMM7PWCgWpcP6EeuLgECj+FWTnlOXhyOIsOKYNJELmYzGFAW8kgF1MVMCYiZCpq2S9CSGT+TS0t6m7EdGQutpHDjoBvQfz/9mtOg0tzT4AJcmseEy/JBm+vgjBIoe9rJxJcPaY9oUEX4gZFpgvZlMl+WH4GCjS32CauMhD4bnUIeDQvK1UGtDeLvTdqljcCi97IAQBawLl4ISeA5jcP4a8c1a3HMwblsj+69UcunutIzm4BLB5PP9bcfv4G1iFO1spP+e7iueYyIqII3fIBAZVFLkB1iXkUHjhEOsbKtUo6JdSxX+pVbx6uvhGhEhLRI8g+kmuYF9KPnWKtILJEf29U0s4Q8T1vhVo5I8QLdpDyxLZI+yl/WNf5ak/LNy2tYkS/UBpSzlbVNGiV8TfKOCdPkEhWb+Ny2Dy0c+ob23a5eVFkvBcg6/jBAL0prf1kZA+s8pHzWRG5Ve02NsKgaWAnXkFqnyZ+Kj8AizoLYfk7oxLIfXkdq623d4GJHfGt0YA1wLZuodkAhsUQNfbMlGOAvB1oFgnuw54szOA/wGAoJRHR2vq3wAAAABJRU5ErkJggg==';
const robot2 = 'data:image/png;base64,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';

let canvasImg = new Canvas();
//const ctximg = canvasImg.getContext('2d');

const img = new Image(); // Create a new Image
img.src = robot2;

const img_charger = new Image();
img_charger.src = charger;



const MapCreator = () => {};
MapCreator.rotateCanvas = function (img, angle) {
	const canvasImg = createCanvas(100, 100);
	const ctxImg = canvasImg.getContext('2d');
	const offset = 90;

	ctxImg.clearRect(0, 0, 100, 100);
	ctxImg.translate(100 / 2, 100 / 2);
	ctxImg.rotate((angle + offset) * Math.PI / 180);
	ctxImg.translate(-100 / 2, -100 / 2);
	ctxImg.drawImage(img, (100 / 2) - (img.width / 2), (100 / 2) - (img.height / 2));
	return canvasImg;
};

MapCreator.CanvasMap = (Mapdata, options, adapter) => {

	if (options) {
		colors.floor = options.FLOORCOLOR;
		colors.obstacle = options.WALLCOLOR;
		colors.path = options.PATHCOLOR;
		colors.newmap = options && options.newmap ? options.newmap : true;
		if (options.ROBOT === 'robot') {
			img.src = robot;
		} else if (options.ROBOT === 'robot1') {
			img.src = robot1;
		} else if (options.ROBOT === 'tank') {
			img.src = tank;
		} else if (options.ROBOT === 'spaceship') {
			img.src = spaceship;
		}
	}
	let maxtop = 0;
	let maxleft = 0;
	let minleft = 0;
	let mintop = 0;

	const canvas = createCanvas();
	const ctx = canvas.getContext('2d');

	canvas.height = 1024 * 4; //Mapdata.image.dimensions.height;
	canvas.width = 1024 * 4; //Mapdata.image.dimensions.width;

	if (Mapdata.image.pixels.floor && Mapdata.image.pixels.floor.length !== 0) {
		if (typeof (Mapdata.image.pixels.floor[0]) === 'object') { //alte Valetudo version und Re bis 0.8

			// Male Boden
			if (Mapdata.image.pixels.floor && Mapdata.image.pixels.floor.length !== 0) {
				ctx.beginPath();
				ctx.fillStyle = colors.floor;
				Mapdata.image.pixels.floor.forEach(function (coord) {
					ctx.rect(coord[0] * 4 + Mapdata.image.position.left * 4, coord[1] * 4 + Mapdata.image.position.top * 4, 4, 4);
				});
				ctx.fill();
			}
			// Male Wände
			if (Mapdata.image.pixels.obstacle_strong && Mapdata.image.pixels.obstacle_strong.length !== 0) {
				ctx.beginPath();
				ctx.fillStyle = colors.obstacle;
				Mapdata.image.pixels.obstacle_strong.forEach(function (coord) {
					ctx.rect(coord[0] * 4 + Mapdata.image.position.left * 4, coord[1] * 4 + Mapdata.image.position.top * 4, 4, 4);

				});
				ctx.fill();
			}
		} else if (typeof (Mapdata.image.pixels.floor[0]) === 'number' ) { // neuere ValetudoRE und normale RR Map
			// init min
			minleft = (Mapdata.image.pixels.floor[0] % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4;
			mintop = (Mapdata.image.dimensions.height - 1 - Math.floor(Mapdata.image.pixels.floor[0] / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4;
			['floor', 'obstacle'].forEach(key => {
				ctx.beginPath();
				Mapdata.image.pixels[key].forEach(function drawPixel(px) {
					if (key === 'obstacle') {
						ctx.fillStyle = colors.newmap ? orgcolors[7] : colors.obstacle;
					} else {
						ctx.fillStyle = colors.newmap ? orgcolors[8] : colors.floor;
					}
					//ctx.fillStyle = colors[key];
					ctx.rect((px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4, 4, 4);

					maxtop = Math.max(maxtop, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4);
					maxleft = Math.max(maxleft, (px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4);
					minleft = Math.min(minleft, (px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4);
					mintop = Math.min(mintop, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4);
					//console.log(this.maxtop, this.maxleft, this.minleft, this.mintop);
				});
				ctx.fill();
			});
		}
	}

	// Zeichne Alle Räume
	if (Mapdata.image.pixels.segments && !Mapdata.currently_cleaned_blocks && colors.newmap) {
		let segnum, lastcolor;
		ctx.beginPath();
		Mapdata.image.pixels.segments.forEach((px, i) => {
			segnum = (px >> 21) % 8;
			if(segnum !== lastcolor){
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = orgcolors[segnum];
				lastcolor = segnum;
			}
			px = px & 0xfffff;
			ctx.rect((px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4, 4, 4);
		});
		ctx.fill();
		ctx.closePath();
	}


	if (Mapdata.currently_cleaned_blocks && colors.newmap) {
		let i, j, segnum, lastcolor;
		ctx.beginPath();
		Mapdata.image.pixels.segments.forEach(px => {
			segnum = px >> 21;
			if (Mapdata.currently_cleaned_blocks.includes(segnum)) {
				if(segnum !== lastcolor){
					ctx.fill();
					ctx.beginPath();
					ctx.fillStyle = orgcolors[segnum % 8];
					lastcolor = segnum;
				}
				px = px & 0xfffff;
				ctx.rect((px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4, 4, 4);
			}
		});
		ctx.fill();
		ctx.closePath();
	}


	// Zeichne Zonen active Zonen
	if (Mapdata.currently_cleaned_zones) {
		if (typeof Mapdata.currently_cleaned_zones[0] !== 'undefined') {
			ctx.beginPath();
			Mapdata.currently_cleaned_zones.forEach(function (coord) {
				ctx.fillStyle = 'rgba(46,139,87,0.1)';
				ctx.fillRect(coord[0] / 12.5, coord[1] / 12.5, (coord[2] / 12.5) - (coord[0] / 12.5), (coord[3] / 12.5) - (coord[1] / 12.5));
				ctx.strokeStyle = '#2e8b57';
				ctx.lineWidth = 4;
				ctx.strokeRect(coord[0] / 12.5, coord[1] / 12.5, (coord[2] / 12.5) - (coord[0] / 12.5), (coord[3] / 12.5) - (coord[1] / 12.5));
			});
		}
	}

	// Zeichne Teppich
	if (Mapdata && Mapdata.image && Mapdata.image.pixels && Mapdata.image.pixels.carpet) {
		let offset = 65 // why the offset??
		ctx.beginPath();
		Mapdata.image.pixels.carpet.forEach(px => {
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.lineWidth = 1;

			ctx.moveTo((px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4 + offset, (Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4);
			ctx.lineTo((px % Mapdata.image.dimensions.width) * 4 + Mapdata.image.position.left * 4 + offset + 4, ((Mapdata.image.dimensions.height - 1 - Math.floor(px / Mapdata.image.dimensions.width)) * 4 + Mapdata.image.position.top * 4) + 4);
		});
		ctx.stroke();
	}

	// Male den Wischpfad
	if (typeof (Mapdata.path) !== 'undefined' && typeof (Mapdata.mop_path) !== 'undefined') {
		let mopOffset = -12 // i dont know why this offset?? Maybe the value from the end
		if (Mapdata.path.points && Mapdata.path.points.length !== 0) {

			ctx.beginPath();
			ctx.lineWidth = 16;
			ctx.lineCap = 'round';
			ctx.strokeStyle = "rgba(255,255,255,0.2)";
			
			Mapdata.path.points.forEach((coord, index) => {
				if (Mapdata.mop_path && Mapdata.mop_path[index + mopOffset] !== 0) {
					if (Mapdata.mop_path[index - 1 + mopOffset] === 0) {
						ctx.moveTo(coord[0] / 12.5, coord[1] / 12.5);
						if (Mapdata.mop_path[index + mopOffset] !== 1) {
							// see value 9 and 12 in mop_path both in front of cahrger
						}

					} else if (Mapdata.mop_path[index - 1 + mopOffset] !== 0) {
						ctx.lineTo(coord[0] / 12.5, coord[1] / 12.5);
					}
				} else if (Mapdata.mop_path && Mapdata.mop_path[index + mopOffset] === 0) {
					if (Mapdata.mop_path[index - 1 + mopOffset] !== 0) {}
				}

			});
			ctx.stroke();
			ctx.closePath();
		}
	}

	// Male den Pfad
	if (typeof (Mapdata.path) !== 'undefined') {
		if (Mapdata.path.points && Mapdata.path.points.length !== 0) {
			ctx.fillStyle = colors.path;
			let ctx_route = canvas.getContext('2d');
			let first = true;
			let cold1, cold2

			ctx.beginPath();
			Mapdata.path.points.forEach((coord, index) => {
				if (first) {
					ctx.fillRect(coord[0] / 12.5, coord[1] / 12.5, 2, 2);
					cold1 = coord[0] / 12.5;
					cold2 = coord[1] / 12.5;
				} else {
					ctx.lineWidth = 1;
					ctx.strokeStyle = colors.path;

					ctx.moveTo(cold1, cold2);
					ctx.lineTo(coord[0] / 12.5, coord[1] / 12.5);
					// ctx.stroke();

					cold1 = coord[0] / 12.5;
					cold2 = coord[1] / 12.5;
				}
				first = false;

			});
			ctx.stroke();
			ctx.closePath();
		}
	}


	// Zeichne Ladestation wenn vorhanden
	if (Mapdata.charger) {
		if (typeof Mapdata.charger[0] !== 'undefined' && typeof Mapdata.charger[1] !== 'undefined') {
			ctx.beginPath();
			ctx.drawImage(img_charger, Mapdata.charger[0] / 12.5 - 15, Mapdata.charger[1] / 12.5 - 15);
		}
	}

	// Zeichne Roboter
	if (Mapdata.robot) {
		//console.log(Mapdata.robot[0]);
		if (Mapdata.path.current_angle && typeof Mapdata.robot[0] !== 'undefined' && typeof Mapdata.robot[1] !== 'undefined') {
			ctx.beginPath();
			canvasImg = MapCreator.rotateCanvas(img, Mapdata.path.current_angle);
			ctx.drawImage(canvasImg, Mapdata.robot[0] / 12.5 - 50, Mapdata.robot[1] / 12.5 - 50, 100, 100);
		} else {
			ctx.drawImage(img, Mapdata.robot[0] / 12.5 - (img.width / 2), Mapdata.robot[1] / 12.5 - (img.height / 2), img.width, img.height);
		}
	}

	// crop image
	const canvas_final = createCanvas();
	const ctx_final = canvas_final.getContext('2d');
	//const trimmed = ctx.getImageData(Mapdata.image.position.left * 4, Mapdata.image.position.top * 4, Mapdata.image.dimensions.width * 4, Mapdata.image.dimensions.height * 4);
	const trimmed = ctx.getImageData(minleft - offset, mintop - offset, maxleft - minleft + 2* offset, maxtop - mintop + offset);

	canvas_final.height = maxtop - mintop + 2 * offset;
	canvas_final.width = maxleft - minleft + 2 * offset;

	ctx_final.putImageData(trimmed, 0, 0);
	//console.log(maxtop, maxleft, minleft, mintop);
	return canvas_final; //.toDataURL();
};

module.exports = MapCreator;
