const fs = require('fs');
const path = require('path');

exports.programDir = path.dirname(process.argv[1]);
exports.args = process.argv.slice(1);
exports.params = {};
exports.params["cd"] = ".";
exports.params["version"] = "last";
exports.params["out"] = path.join(exports.programDir, "Minecraft");

for (let i = 1; i < exports.args.length; i++)
	if (exports.args[i].substr(0, 1) === "-" && exports.params.hasOwnProperty(exports.args[i].substr(1)) && (i + 1) < exports.args.length)
		exports.params[exports.args[i].substr(1)] = exports.args[++i];

exports.readAllDirSync = function(dir, filelist, objList = false, base = "")
{
	var files = fs.readdirSync(dir);

	filelist = filelist || [];
	files.forEach(function(file)
	{
		if (fs.statSync(dir + file).isDirectory())
			filelist = exports.readAllDirSync(dir + file + '/', filelist, objList, base + "/" + file);
		else
		{
			if (objList)
				filelist.push(base + "/" + file);
			else
				filelist.push(file);
		}
	});
	return (filelist);
};

exports.copyAllSync = function(srcDir, dstDir)
{
	var results = [], stat;
	var list = fs.readdirSync(srcDir);
	var src, dst;

	list.forEach(function(file)
	{
		src = path.join(srcDir, file);
		dst = path.join(dstDir, file);
		stat = fs.statSync(src);
		if (stat && stat.isDirectory())
		{
			if (!fs.existsSync(dst))
				fs.mkdirSync(dst);
			results = results.concat(exports.copyAllSync(src, dst));
		}
		else
		{
			if (!fs.existsSync(dstDir))
				fs.mkdirSync(dstDir);			
			if (fs.existsSync(src))
			{
				fs.writeFileSync(dst, fs.readFileSync(src));
				results.push(src);
			}
		}
	});
	return (results);
}
exports.mkpath = function(dirpath, mode)
{
	dirpath = path.resolve(dirpath);

	if (typeof mode === 'undefined')
		mode = parseInt('0777', 8) & (~process.umask());

	try
	{
		if (!fs.statSync(dirpath).isDirectory())
			throw new Error(dirpath + ' exists and is not a directory');
	}
	catch (err)
	{
		if (err.code === 'ENOENT')
		{
			exports.mkpath(path.dirname(dirpath), mode);
			fs.mkdirSync(dirpath, mode);
		}
		else
			throw err;
	}
};

exports.correctPath = path => path.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/\.\//g, "/").replace(/^\.\//, "");

exports.rmdirForce = function(path)
{
	if (fs.existsSync(path))
	{
		fs.readdirSync(path).forEach((file) =>
		{
			var curPath = `${path}/${file}`;
			if (fs.lstatSync(curPath).isDirectory())
				exports.rmdirForce(curPath);
			else
				fs.unlinkSync(curPath);
		});
		fs.rmdirSync(path);
	}
};
