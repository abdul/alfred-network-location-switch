const spawn = require("child_process").spawnSync;

const regex = /\(([^)]+)\)/;

function NetworkLocaton(selected, name) {
	this.selected = selected;
	this.name = name;
	this.isSelected = () => {
		return this.selected === true;
	};
	this.isDeselected = () => {
		return this.selected === false;
	};
}

const list = () => {
	let locations = [];
	let result = spawn("scselect");
	let lines = result.stdout.toString().split("\n");
	console.log(lines);
	lines.forEach((line, index, arr) => {
		if (index === arr.length - 1 && line === "") {
			return;
		}
		if (line.indexOf("Available") > -1) {
			return;
		}
		if (index === 0) {
			return;
		}

		if (line) {
			let location = new NetworkLocaton(
				line.indexOf("*") > -1,
				regex.exec(line.split("\t"))[1]
			);
			locations.push(location);
		}
	});

	return locations;
};

const findByName = name => {
	return list().find(c => {
		return c.name === name;
	});
};

exports.List = list;

exports.Select= name => {
	return spawn("scselect", ["-n", name]);
};

exports.IsSelected = name => {
	let found = findByName(name);
	return found !== undefined && found.isSelected();
};
