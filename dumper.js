const fs = require('fs');
const path = require('path');
const https = require('https');
const request = require('request');
const child_process = require('child_process');
const AdmZip = require('adm-zip');
const Utility = require('./utility');

exports.compileBlocks = (dirPath) =>
{
	let	res = {}, data, list = [];

	console.log("\t-> Blocks compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "data/reports/blocks.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "data/reports/blocks.json"), "utf8"))
		for (let key in data)
			res[key] = (data[key].properties !== undefined) ? data[key].properties : null;
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/blocks.json`, JSON.stringify(res, null, '\t'), "utf8");
		list.push(`${dirPath}/blocks.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileItems = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Items compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "data/reports/items.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "data/reports/items.json"), "utf8"))
		for (let key in data)
			res.push(key);
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/items.json`, JSON.stringify(res, null, '\t'), "utf8");
		list.push(`${dirPath}/items.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileEntities = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Entities compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "unknown/entities.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "unknown/entities.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/entities.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/entities.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileEnchantments = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Enchantments compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "unknown/enchantments.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "unknown/enchantments.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/enchantments.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/enchantments.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileEffects = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Effects compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "unknown/effects.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "unknown/effects.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/effects.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/effects.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileParticles = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Particles compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "unknown/particles.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "unknown/particles.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/particles.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/particles.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileAdvancements = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, JSON.stringify(JSON.parse(fs.readFileSync(`${input}/${file}`, "utf8")), null, '\t'), "utf8");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}
	console.log("\t-> Advancements compilation...");
	if (!fs.existsSync(`${dirPath}/advancements`))
		Utility.mkpath(`${dirPath}/advancements`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/advancements"), `${dirPath}/advancements`);
	return (list);
}

exports.compileLootTables = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, JSON.stringify(JSON.parse(fs.readFileSync(`${input}/${file}`, "utf8")), null, '\t'), "utf8");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}
	console.log("\t-> Loot Tables compilation...");
	if (!fs.existsSync(`${dirPath}/loot_tables`))
		Utility.mkpath(`${dirPath}/loot_tables`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/loot_tables"), `${dirPath}/loot_tables`);
	return (list);
}

exports.compileRecipes = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, JSON.stringify(JSON.parse(fs.readFileSync(`${input}/${file}`, "utf8")), null, '\t'), "utf8");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}

	console.log("\t-> Recipes compilation...");
	if (!fs.existsSync(`${dirPath}/recipes`))
		Utility.mkpath(`${dirPath}/recipes`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/recipes"), `${dirPath}/recipes`);
	return (list);
}

exports.compileStructures = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, fs.readFileSync(`${input}/${file}`, "binary"), "binary");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}

	console.log("\t-> Structures compilation...");
	if (!fs.existsSync(`${dirPath}/structures`))
		Utility.mkpath(`${dirPath}/structures`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/structures"), `${dirPath}/structures`);
	return (list);
}

exports.compileTags = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, JSON.stringify(JSON.parse(fs.readFileSync(`${input}/${file}`, "utf8")), null, '\t'), "utf8");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}

	console.log("\t-> Tags compilation...");
	if (!fs.existsSync(`${dirPath}/tags`))
		Utility.mkpath(`${dirPath}/tags`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/tags"), `${dirPath}/tags`);
	return (list);
}

exports.compileSounds = (dirPath) =>
{
	let	res = {}, data, list = [];

	console.log("\t-> Sounds compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "data/data/minecraft/sounds.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "data/data/minecraft/sounds.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/sounds.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/sounds.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileLang = (dirPath) =>
{
	var	list = [];
	let	readDir = (input, output) =>
	{
		if (!fs.existsSync(input))
			return;
		fs.readdirSync(input).forEach((file) =>
		{
			if (fs.lstatSync(`${input}/${file}`).isDirectory())
				readDir(`${input}/${file}`, `${output}/${file}`);
			else
			{
				if (!fs.existsSync(output))
					Utility.mkpath(output);
				fs.writeFileSync(`${output}/${file}`, JSON.stringify(JSON.parse(fs.readFileSync(`${input}/${file}`, "utf8")), null, '\t'), "utf8");
				list.push(`${output}/${file}`.replace(Utility.programDir, "."));
			}
		});
	}
	console.log("\t-> Lang compilation...");
	if (!fs.existsSync(`${dirPath}/lang`))
		Utility.mkpath(`${dirPath}/lang`);
	readDir(path.join(Utility.programDir, "data/data/minecraft/lang"), `${dirPath}/lang`);
	return (list);
}

exports.compileCriterion = (dirPath) =>
{
	let	res = [], data, list = [];

	console.log("\t-> Criterion compilation...");
	if (fs.existsSync(path.join(Utility.programDir, "unknown/criterion.json")))
	{
		data = JSON.parse(fs.readFileSync(path.join(Utility.programDir, "unknown/criterion.json"), "utf8"))
		if (!fs.existsSync(dirPath))
			Utility.mkpath(dirPath);
		fs.writeFileSync(`${dirPath}/criterion.json`, JSON.stringify(data, null, '\t'), "utf8");
		list.push(`${dirPath}/criterion.json`.replace(Utility.programDir, "."));
	}
	return (list);
}

exports.compileData = (dirPath) =>
{
	var	list = [];

	console.log("\tData compilation...");
	list = list.concat(exports.compileBlocks(dirPath));
	list = list.concat(exports.compileItems(dirPath));
	list = list.concat(exports.compileEntities(dirPath));
	list = list.concat(exports.compileEnchantments(dirPath));
	list = list.concat(exports.compileEffects(dirPath));
	list = list.concat(exports.compileParticles(dirPath));
	list = list.concat(exports.compileAdvancements(dirPath));
	list = list.concat(exports.compileLootTables(dirPath));
	list = list.concat(exports.compileRecipes(dirPath));
	list = list.concat(exports.compileStructures(dirPath));
	list = list.concat(exports.compileTags(dirPath));
	list = list.concat(exports.compileSounds(dirPath));
	list = list.concat(exports.compileLang(dirPath));
	list = list.concat(exports.compileCriterion(dirPath));
	for (let i = 0; i < list.length; i++)
		list[i] = path.posix.normalize(list[i]).replace(/^\.[\\/]/g, "");
}

exports.generateData = (fileName = null) =>
{
	let	tmp;

	if (fileName === null)
		return;
	// tmp = process.cwd();
	console.log("\tData generation...");
	// process.chdir(Utility.programDir);
	child_process.execSync(`java -cp ./data/${fileName} net.minecraft.data.Main --output data --all`);
	var	zip = new AdmZip(`./data/${fileName}`);
	zip.getEntries().forEach(function(zipEntry)
	{
		// console.log(zipEntry.entryName);
		if (zipEntry.entryName.match(new RegExp("^data/minecraft/loot_tables")) !== null && !zipEntry.isDirectory)
			zip.extractEntryTo(zipEntry.entryName, path.join(Utility.programDir, "data"), true, true);
		else if (zipEntry.entryName.match(new RegExp("^data/minecraft/structures")) !== null && !zipEntry.isDirectory)
			zip.extractEntryTo(zipEntry.entryName, path.join(Utility.programDir, "data"), true, true);
		else if (zipEntry.entryName.match(new RegExp("^assets/minecraft/lang")) !== null && !zipEntry.isDirectory)
			zip.extractEntryTo(zipEntry.entryName, path.join(Utility.programDir, "data/data/minecraft/lang/"), false, true);
	});
	Utility.copyAllSync("./minecraft_tmp", "./data/data/minecraft");
	// process.chdir(tmp);
	Utility.rmdirForce(path.join(Utility.programDir, "logs"));
	Utility.rmdirForce(path.join(Utility.programDir, "minecraft_tmp"));
	Utility.rmdirForce(path.join(Utility.programDir, "data/tmp"));
	Utility.rmdirForce(path.join(Utility.programDir, "data/.cache"));
}

exports.downloadData = (dataTransform = true) =>
{
	console.log("\tRead version manifest...");
	request("https://launchermeta.mojang.com/mc/game/version_manifest.json", (error, response, data) =>
	{
		if (error === null && (response && response.statusCode) === 200)
		{
			data = JSON.parse(data);
			let	versionID = (Utility.params["version"] === "last") ? data.versions[0].id : Utility.params["version"];
			let	file;
			let	resFile = data.versions[0].url;
			let	fileName = "minecraft_server." + versionID + ".jar";
			let	stream;

			if (Utility.params["version"] === "last")
				console.log("\tLast version:", versionID);
			else
				console.log("\tVersion ID:", versionID);
			if (!fs.existsSync(path.join(Utility.programDir, "data", fileName)))
			{
				if (fs.existsSync(path.join(Utility.programDir, "data")))
					fs.readdirSync(path.join(Utility.programDir, "data")).forEach((fileJar) => {if (fileJar.match(new RegExp(`^${fileName}$`)) === null && fileJar.match(new RegExp(`^minecraft_server\..*\.jar$`)) !== null) {fs.unlinkSync(path.join(Utility.programDir, "data", fileJar));}});
				console.log("\tDownload new version...");
				if (fs.existsSync(path.join(Utility.programDir, "data")))
					Utility.rmdirForce(path.join(Utility.programDir, "data"));
				if (!fs.existsSync(path.join(Utility.programDir, "data")))
					fs.mkdirSync(path.join(Utility.programDir, "data"));
				if (fs.existsSync(path.join(Utility.programDir, "Minecraft")))
					Utility.rmdirForce(path.join(Utility.programDir, "Minecraft"));
				request(resFile, (error, response, data) =>
				{
					if (error === null && (response && response.statusCode) === 200)
					{
						file = JSON.parse(data).downloads.server.url;
						request(JSON.parse(data).assetIndex.url, (error, response, data) =>
						{
							if (error === null && (response && response.statusCode) === 200)
							{
								let	obj = JSON.parse(data).objects;
								let	dlList = {};
								let	loadFileList = (list) =>
								{
									let	name = Object.keys(list)[0];
									let	addr = list[name];
									delete list[name];
									request(addr, (error, response, data) =>
									{
										if (error === null && (response && response.statusCode) === 200)
										{
											console.log("\t-> Download", name.replace("../../minecraft_tmp/", "minecraft/"));
											if (!fs.existsSync(path.join(Utility.programDir, "data", "data", path.dirname(name))))
												Utility.mkpath(path.join(Utility.programDir, "data", "data", path.dirname(name)));
											fs.writeFileSync(path.join(Utility.programDir, "data", "data", name), data, "utf8");
											if (Object.keys(list).length)
												loadFileList(list);
											else
											{
												console.log("\t-> Download", fileName);
												stream = fs.createWriteStream(path.join(Utility.programDir, "data", fileName));
												https.get(file, (response) =>
												{
													response.pipe(stream);
													stream.on('finish', () =>
													{
														console.log("\tDownload finished...");
														if (dataTransform)
														{
															exports.generateData(fileName);
															exports.compileData(Utility.params["out"]);
														}
													});
												});
											}
										}
										else
											console.log("\t-> Fail to download", name.replace("../../minecraft_tmp/", "minecraft/"), response);
									});
								}
								for (let key in obj)
									if (key.match(/^minecraft\/lang\//) !== null)
										dlList[key.replace(/^minecraft\//, "../../minecraft_tmp/")] = `http://resources.download.minecraft.net/${obj[key].hash.substr(0, 2)}/${obj[key].hash}`;
								dlList["../../minecraft_tmp/sounds.json"] = `http://resources.download.minecraft.net/${obj["minecraft/sounds.json"].hash.substr(0, 2)}/${obj["minecraft/sounds.json"].hash}`;
								loadFileList(dlList);
							}
						});
					}
				});
			}
			else
			{
				if (!fs.existsSync(Utility.params["out"]))
				{
					exports.generateData(fileName);
					exports.compileData(Utility.params["out"]);
				}
				else
					console.log("\tNo modification needed");
			}
		}
		else
			console.log("\tFail to connect.");
	});
}
