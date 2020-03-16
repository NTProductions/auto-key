// Auto Keyframer
var globalTime = -1;
var mainWindow = new Window("palette", "Auto Keyer", undefined);
var testText = mainWindow.add("statictext", undefined, "Test");

// or should i use amouse event of some kihnd????

mainWindow.center();
mainWindow.show();

testText.addEventListener("mousemove", keyframeClick, false);

function keyframeClick() {
	if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
		alert("Please select a composition");
		return false;
	}
	var comp = app.project.activeItem;
	if(comp.selectedProperties == null || comp.selectedProperties.length < 1) {
		alert("Please select at least 1 property to Auto-Key");
		return false;
	}

	var selectedProperties = comp.selectedProperties;
	var time = comp.time;
	if(time != globalTime) {
		globalTime = time;
		autoKeyHere(selectedProperties, time);
	}
}

function isKeyAtThisTime(prop, time) {
	for(var i = 1; i <= prop.numKeys; i++) {
		if(prop.keyTime(i) == time) {
			return true;
		}
	}

	return null;
}

function autoKeyHere(props, keyTime) {
	for(var i = 0; i < props.length; i++) {
		if(props[i].numKeys < 1) {
			props[i].setValueAtTime(keyTime, props[i].value);
		}
		else if(isKeyAtThisTime(props[i], keyTime) == null) {
			props[i].setValueAtTime(keyTime, props[i].value);
		}
	
	}
}