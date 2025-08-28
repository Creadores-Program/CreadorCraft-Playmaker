let globals = {
	name: "a CCPlaymaker powered by Three.js Game",
	icon: "https://example.com/image.webp",
	sceneProps: {
		dayCicle: false,
		dayCicleTimeS: 0,
		background: '',
		backgroundColor: 0x80a0e0,
		onControls: true,
		playerGroupName: ""
	}
};
let styleCssCCPlaymaker = `
.Interface2D{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0%;
    left: 0%;
	align-items: center;
	overflow: auto;
}
button {
    background-color: lightblue;
    border-radius: 5px;
    border: none;
    border-radius: 0.7vw;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    padding: 0.7vw 2vw;
    font-family: inherit;
    outline: none;
}
button:active{
    transform: scale(0.97);
    box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}
button:focus {
    outline: 2px solid #56A5EC;
}
input {
    background-color: lightblue;
}
input[type="text"], input[type="password"], input[type="email"] {
    border: 1.5px solid #b0c4de;
    border-radius: 0.5vw;
    padding: 0.7vw 1vw;
    font-size: 2.4vw;
    background: #f8fbff;
    transition: border 0.2s;
}
input[type="text"]:focus, input[type="password"]:focus, input[type="email"]:focus {
    border: 1.5px solid #56A5EC;
    background: #fff;
}
::-webkit-scrollbar {
    width: 0.7vw;
    background: #e3eaf3;
}
::-webkit-scrollbar-thumb {
    background: #b0c4de;
    border-radius: 0.5vw;
}
::-webkit-scrollbar-thumb:hover {
    background: #56A5EC;
}
`;
let elementCssPlaym = document.createElement('style');
elementCssPlaym.innerHTML = styleCssCCPlaymaker;
document.head.appendChild(elementCssPlaym);
class CCPlaymaker{
	static getSceneAPI(){
		class SceneAPI{
			constructor(scene){
				this.scene = scene;
				if(globals.dayCicle){
					this.dayCicleConter = 0;
					this.dayCicle = setInterval(this.$dayCicleLoop.bind(this), 1);
				}
			}
			$dayCicleLoop(){
				this.dayCicleConter++;
				if(this.dayCicleConter > globals.dayCicleTimeS){
					this.dayCicleConter = 0;
				}
				let base = globals.dayCicleTimeS / 4;
				if(this.dayCicleConter <= base){
				    this.scene.background = SceneAPI.dayCicles[0];
				}else if(this.dayCicleConter <= base * 2){
					this.scene.background = SceneAPI.dayCicles[1];
				}else if(this.dayCicleConter <= base * 3){
					this.scene.background = SceneAPI.dayCicles[2];
				}else{
					this.scene.background = SceneAPI.dayCicles[3];
				}
			}
			setSky(id){
				this.scene.background = SceneAPI.dayCicles[id];
			}
			setBackgroundColor(color){
				this.scene.background = color;
			}
			findObjectByName(name){
				return this.scene.getObjectByName(name);
			}
		};
		SceneAPI.dayCicles = [
			{
				color: 0xee8b48//mañanita
			},
			{
				color: 0x80a0e0//tarde
			},
			{
				color: 0xff8c69//atardecer
			},
			{
				color: 0x0c0d2b//noche
			}
		];
		return SceneAPI;
	}
	static getPlayer(){
		return class Player{};
	}
	static getElementAPI(){
		return class ElementAPI{};
	}
	static getInterface2D(){
		return class Interface2D{
			constructor(dataElements, dataInterface){
				this.elementHtml = document.createElement("div");
				this.elementHtml.className = 'Interface2D';
				if(dataInterface){
				    this.$renderSuper(dataInterface);
				}
				this.$renderData(dataElements);
			}
			$renderSuper(data){
				if(data.style){
					for(let key in data.style){
						element.style[key] = data.style[key];
					}
				}
			}
			$renderData(data){
				for(let i = 0; i < data.length; i++){
					let date = data[i];
					switch(date.type){
						case "button":
							this.$renderButton(date);
							break;
						case "text":
							this.$renderText(date);
							break;
						case "image":
							this.$renderImage(date);
							break;
						default:
							this.$renderRaw(date);
					}
				}
			}
			$renderButton(data){
				let element = document.createElement("button");
				element.style.alignItems = 'center';
				if(data.style){
					for(let key in data.style){
						element.style[key] = data.style[key];
					}
				}
				if(data.image){
					let image = document.createElement("img");
					image.src = data.image;
					image.alt = data.image;
					image.style.width = "60px";
                    image.style.height = "60px";
                    image.style.marginRight = '5px';
					element.appendChild(image);
				}
				if(data.text){
					let text = document.createTextNode(data.text);
					element.appendChild(text);
				}
				if(data.clickEvent){
					element.onclick = data.clickEvent;
				}
				this.elementHtml.appendChild(element);
				this.elementHtml.appendChild(document.createElement("br"));
			}
			$renderText(data){
				let element = document.createElement("div");
				let text = document.createTextNode(data.text);
				element.appendChild(text);
				if(data.style){
					for(let key in data.style){
						element.style[key] = data.style[key];
					}
				}
				this.elementHtml.appendChild(element);
				this.elementHtml.appendChild(document.createElement("br"));
			}
			$renderImage(data){
				let element = document.createElement("img");
				element.src = data.image;
				if(data.style){
					for(let key in data.style){
						element.style[key] = data.style[key];
					}
				}
				if(data.text){
					element.alt = data.text;
				}
				this.elementHtml.appendChild(element);
				this.elementHtml.appendChild(document.createElement("br"));
			}
			$renderRaw(data){
				let element = document.createElement("div");
				if(data.style){
					for(let key in data.style){
						element.style[key] = data.style[key];
					}
				}
				element.innerHTML = data.text;
				this.elementHtml.appendChild(element);
				this.elementHtml.appendChild(document.createElement("br"));
			}
			createButton(data){
				this.$renderButton(data);
				return this;
			}
			createText(data){
				this.$renderText(data);
				return this;
			}
			createImage(data){
				this.$renderImage(data);
				return this;
			}
			createDiv(data){
				this.$renderRaw(data);
				return this;
			}
			updateDataSuper(data){
				this.$renderSuper(data);
				return this;
			}
			updateData(data){
				this.$renderData(data);
				return this;
			}
			clear(){
				this.elementHtml.innerHTML = "";
			}
			show(){
				this.elementHtml.style.display = 'none';
			}
			hide(){
				this.elementHtml.style.display = 'block';
			}
			fadeIn(){
				if($){
					$(this.elementHtml).fadeIn();
				}else{
					this.show();
				}
			}
			fadeOut(){
				if($){
					$(this.elementHtml).fadeOut();
				}else{
					this.hide();
				}
			}
			remove(){
				this.elementHtml.remove();
			}
			spawn(){
				document.body.appendChild(this.elementHtml);
			}
		};
	}
	static getFormAPI(){
		const Interface2D = CCPlaymaker.getInterface2D();
		return class FormAPI extends Interface2D{
			constructor(data){
				let dataF = {
					style: {
						backgroundColor: "rgba(0, 0, 0, 0.5)"
					}
				};
				super([], dataF);
				this.elementHtmlSuper = this.elementHtml;
				this.elementHtml = document.createElement("div");
				this.elementHtml.style.backgroundColor = "#56A5EC";
				this.elementHtml.style.width = "50%";
				this.elementHtml.style.height = "50%";
				this.elementHtml.style.position = "fixed";
				this.elementHtml.style.top = "50%";
				this.elementHtml.style.left = "50%";
				this.elementHtml.style.overflow = "auto";
				this.elementHtml.style.alignItems = "center";
				this.elementHtml.style.transform = "translate(-50%, -50%)";
				this.$renderData(data);
				this.elementHtmlSuper.appendChild(this.elementHtml);
			}
			show(){
				this.elementHtmlSuper.style.display = 'none';
			}
			hide(){
				this.elementHtmlSuper.style.display = 'block';
			}
			fadeIn(){
				if($){
					$(this.elementHtmlSuper).fadeIn();
				}else{
					this.show();
				}
			}
			fadeOut(){
				if($){
					$(this.elementHtmlSuper).fadeOut();
				}else{
					this.hide();
				}
			}
			remove(){
				this.elementHtmlSuper.remove();
			}
			spawn(){
				document.body.appendChild(this.elementHtmlSuper);
			}
			
		};
	}
	static getControlsAPI(){
		const Interface2D = CCPlaymaker.getInterface2D();
		return class ControlsAPI extends Interface2D{};
	}
	static getLoadInterface(){
		const Interface2D = CCPlaymaker.getInterface2D();
		return class LoadInterface extends Interface2D{
			constructor(){
				if(globals.icon.startsWith("gameFiles://") && LoadUrlCC){
					globals.icon = globals.icon.replace("gameFiles://", "");
					let iconSub = globals.icon;
					globals.icon = null;
					let indexP = iconSub.lastIndexOf('.');
					let mimetype;
					if(indexP == -1 || indexP == iconSub.length - 1){
						mimetype = "png/image";
					}else{
						mimetype = (iconSub.substring(indexP + 1).toLowerCase())+"/image";
					}
					LoadUrlCC.fileToUrl(iconSub, mimetype).then(function(iconn){
						globals.icon = iconn;
					}).catch(function(error){
						console.error(error);
						globals.icon = iconSub;
					});
					for(let i = 0; i < 2; i++){
						if(globals.icon == null){
							i = 0;
						}else{
							i = 1;
						}
					}
				}
				let data = [
					{
						type: "image",
						image: globals.icon,
						text: globals.name,
						style: {
							width: "20%",
							height: "20%"
						}
					},
					{
						type: "text",
						text: globals.name,
						style: {
							fontSize: "8vw"
						}
					},
					{
						type: "text",
						text: "CCPlaymaker powered by Three.js",
						style: {
							fontSize: "4vw"
						}
					}
				];
				super(data, {
					style: {
						backgroundColor: "black",
					}
				});
			}
		};
	}
	static getModelAPI(){
		return class ModelAPI{};
	}
}
window.CCPlaymaker = CCPlaymaker;
let LoadInterface = CCPlaymaker.getLoadInterface();
let instanceLoad = new LoadInterface();
instanceLoad.spawn();
function start(){
	let SceneAPI = CCPlaymaker.getSceneAPI();
	this.userData.CCPlaymaker = new SceneAPI();
	instanceLoad.remove();
	instanceLoad = null;
}
function update( event ) {
	this.userData.CCPlaymaker.$update(event);
}
function stop(){
	this.userData.CCPlaymaker.$stop();
}
