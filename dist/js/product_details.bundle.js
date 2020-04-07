/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "69709e845f12e3933d38";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "product_details";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/product_details.js")(__webpack_require__.s = "./src/js/product_details.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/atcsjs/header.js":
/*!*************************************!*\
  !*** ./src/common/atcsjs/header.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//判断是否登录\n$(() => {\n  let userName = sessionStorage.user_name;\n\n  if (!userName) {\n    $.get('/islogin').then(data => {\n      if (data.code > 0) {\n        sessionStorage.user_name = data.msg;\n        let $li = $('div.right-r>ul').children(':last');\n        $li.children('a').html('注销').attr('href', 'javascript:');\n        $li.prev().children('a').html(`WELCOM: ${data.msg}`).attr('href', 'javascript:');\n      }\n    });\n  } else {\n    let $li = $('div.right-r>ul').children(':last');\n    $li.children('a').html('注销').attr('href', 'javascript:');\n    $li.prev().children('a').html(`WELCOM: ${sessionStorage.user_name}`).attr('href', 'javascript:');\n  }\n}); //注销功能\n\n$(() => {\n  $('div.right-r>ul').on('click', ':contains(注销)', e => {\n    sessionStorage.userName = '';\n    $.get('/logup').then(data => {\n      // console.log(data)\n      if (data.code > 0) {\n        sessionStorage.user_name = '';\n        location.reload(true);\n      }\n    });\n  });\n}); //楼层滚动 导航条的显示、隐层\n\n$(() => {\n  //窗口滚动触发事件\n  let scro = () => {\n    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;\n\n    if (scrollTop == 0) {\n      $('div#floor3').show('2s');\n      $('div.hiden-header').hide();\n    } else if (scrollTop > 150) {\n      $('div#floor3').hide();\n      $('div.hiden-header').show('2s');\n    }\n  };\n\n  $(window).scroll(() => {\n    scro();\n  });\n  scro(); //页面初始化时用\n}); // 搜索框的单击事件 模拟触发  两个搜索框的通信\n\n$(() => {\n  //给搜索框的放大镜搜索图片绑定单击事件\n  $(document.body).on('click', 'img[data-trigger=search]', e => {\n    let $searBtn = $(e.target),\n        $input = $searBtn.siblings('input.txtSearch');\n\n    if ($.trim($input.val()) !== '') {\n      sessionStorage.inputMsg = $input.val();\n      location = 'http://127.0.0.1:3336/html/product.html';\n    } else {\n      $input.attr('placeholder', '!!!!请输入要查找的关键字!!!!!'); //console.log($input.val())\n    }\n  }); //给搜索的搜索框绑定键盘事件 keyup\n\n  $(document.body).on('keyup', 'input.txtSearch', e => {\n    let key = e.keyCode,\n        $input = $(e.target); //console.log(key)\n\n    switch (key) {\n      case 13:\n        if ($input.siblings('ul').is(':has(.focus)')) {\n          sessionStorage.lid = $input.siblings('ul.shelper').children('.focus').data('lid');\n          $('input.txtSearch').val($input.siblings('ul.shelper').children('.focus').html()).focus().siblings('ul.shelper').children().removeClass('focus');\n          $('ul.shelper').hide();\n        } else {\n          $input.siblings('img[data-trigger=search]').click();\n        } // console.log(e.keyCode)\n\n\n        break;\n\n      case 38:\n        //console.log('向上')\n        if (!$input.siblings('ul').is(':has(.focus)')) {\n          $input.siblings('ul').children().first().addClass('focus');\n        } else if ($input.siblings('ul').children().first().is('.focus')) {\n          $input.siblings('ul').children().removeClass('focus').last().addClass('focus');\n        } else {\n          $input.siblings('ul').children('.focus').removeClass('focus').prev().addClass('focus');\n        }\n\n        $input.val($input.siblings('ul').children('.focus').html());\n        break;\n\n      case 40:\n        //console.log('向下')\n        if (!$input.siblings('ul').is(':has(.focus)')) {\n          $input.siblings('ul').children().first().addClass('focus');\n        } else if ($input.siblings('ul').children().last().is('.focus')) {\n          $input.siblings('ul').children().removeClass('focus').first().addClass('focus');\n        } else {\n          $input.siblings('ul').children('.focus').removeClass('focus').next().addClass('focus');\n        }\n\n        $input.val($input.siblings('ul').children('.focus').html());\n        break;\n\n      default:\n        $('input.txtSearch').val($input.val()); //搜索框的通信 \n\n        if ($input.val() != '') {\n          $.get('/index/autocomp', {\n            kw: $.trim($input.val())\n          }).then(data => {\n            //console.log(data)\n            let li = '',\n                lidArr = [];\n\n            if (data.length != 0) {\n              for (let msg of data) {\n                li += `<li data-lid=\"${msg.lid}\">${msg.title}</li>`;\n                lidArr.push(msg.lid);\n              }\n\n              $('ul.shelper').html(li).show();\n              sessionStorage.lidArr = lidArr;\n            } else {\n              li += `<li>)'>_<'( 没有搜索到您想要的商品</li>`;\n              li += `<li><a href=\"html/product.html?kw=*\">*************为您推荐***********</a></li>`;\n              $('ul.shelper').html(li).show();\n            }\n          });\n        }\n\n    }\n  }); //给自动完成搜索帮助添加事件\n\n  $('ul.shelper').on('click', 'li', e => {\n    let $li = $(e.target); //console.log(1)\n\n    $('input.txtSearch').val($li.html());\n    $li.parent().siblings('input').focus();\n    sessionStorage.lid = $li.data('lid');\n    $('ul.shelper').hide();\n  }); //添加搜索框失去焦点事件\n\n  $('div:has(.txtSearch).row').on('mouseleave', e => {\n    $('ul.shelper').hide();\n  }); // $('input.txtSearch').on('blur', e =>{\n  //     $(e.target).siblings('ul').hide()\n  // })\n}); //body绑定单击事件 如果没有登陆就阻止行为 弹出登录框\n\n$(() => {\n  $(document.body).on('click', 'img[data-pass]', e => {\n    e.preventDefault();\n    let $e = e.target; //console.log(e.target)\n\n    $.get('/islogin').then(data => {\n      if (data.code < 0) {\n        $('div.login-modal').css('display', 'block');\n      } else {\n        location = $($e).parent().attr('href');\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/common/atcsjs/header.js?");

/***/ }),

/***/ "./src/common/atcsjs/login_modal.js":
/*!******************************************!*\
  !*** ./src/common/atcsjs/login_modal.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//用户名、密码格式的验证格式的验证\n$(() => {\n  //用户名格式正则表达式\n  let ureg = /^[\\w \\u4e00-\\u9fa5]{2,18}$/; //密码格式正则表达式\n\n  let preg = /^[\\w]{6,12}$/; //用户名的验证\n\n  $('div.login-modal').on('blur', 'input[type=text]', e => {\n    let $e = $(e.target),\n        $val = $.trim($e.val());\n\n    if ($val !== '' && ureg.test($val)) {\n      $e.siblings('div').data('type', 1).html('√用户名格式正确√').addClass('succ');\n    } else if ($val == '') {\n      $e.siblings('div').data('type', -1).html('*****用户名不能为空').addClass('fail');\n    } else {\n      $e.siblings('div').data('type', -1).html('****用户名格式不正确').addClass('fail');\n    }\n  }); //密码的验证\n\n  $('div.login-modal').on('blur', 'input[type=password]', e => {\n    let $e = $(e.target),\n        $val = $.trim($e.val());\n\n    if ($val !== '' && preg.test($val)) {\n      $e.siblings('div').data('type', 1).html('√').addClass('succ');\n    } else if ($val == '') {\n      $e.siblings('div').data('type', -1).html('*****密码不能为空').addClass('fail');\n    } else {\n      $e.siblings('div').data('type', -1).html('****密码格式不正确').addClass('fail');\n    }\n  }); //得到焦点时移除相对应的提示\n\n  $('div.login-modal').on('focus', 'input:not([type=button])', e => {\n    $(e.target).siblings('div').removeClass();\n  });\n}); //登录按钮单击登录\n\n$(() => {\n  $('div.login-modal').on('click', 'input[type=button]', e => {\n    let $e = $(e.target),\n        $type = $('div.user').children('div').data('type') + $('div.pwd').children('div').data('type'); //console.log($type)\n\n    if ($type <= 0) {\n      $e.next().html('**用户名或密码格式不正确**').addClass('fail');\n    } else {\n      let $uname = $('div.user').children('input').val();\n      let $upwd = $('div.pwd').children('input').val();\n      $.get('/login', {\n        uname: $.trim($uname),\n        upwd: $.trim($upwd)\n      }).then(data => {\n        console.log(data);\n        let code = data.code,\n            msg = data.msg;\n\n        if (code < 0) {\n          $e.next().html(msg).addClass('fail');\n        } else {\n          sessionStorage.user_name = data.msg;\n          location.reload(true);\n        }\n      });\n    }\n\n    setTimeout(() => {\n      $e.next().removeClass();\n    }, 1500);\n  });\n}); //登录框的X的单机事件 可以不登陆\n\n$(() => {\n  $('div.login-modal').on('click', 'button', e => {\n    $(e.target).parent().parent().css('display', 'none');\n  });\n});\n\n//# sourceURL=webpack:///./src/common/atcsjs/login_modal.js?");

/***/ }),

/***/ "./src/common/htmljs/detail_html.js":
/*!******************************************!*\
  !*** ./src/common/htmljs/detail_html.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (detail) {\n  return `\n            <div>\n                <h2>${detail.lname}</h2>\n                <h4>${detail.title}</h4>\n                <div class=\"price\">\n                    <div class=\"pro_price\"><b>学员售价：</b><span>￥${detail.price}</span></div>\n                    <div class=\"promise\">\n                        <b>服务承诺：</b>\n                        <span>${detail.promise}</span>\n                    </div>\n                </div>\n                <p class=\"parameter\">\n                    <b>客服：</b>\n                    <span class=\"connect\">联系客服</span>\n                    <img class=\"gif\" src=\"../img/product_detail/kefuf.gif\">\n                </p>\n                <p class=\"style choose_color\">\n                    <s class=\"color\">颜色：</s>\n                    <input type=\"button\" class=\"i1\" value=\"黑色\" title=\"黑色\">\n                    <input type=\"button\" class=\"i2\" value=\"灰色\" title=\"灰色\">\n                    <input type=\"button\" class=\"i3\" value=\"金色\" title=\"金色\">\n                    <input type=\"button\" class=\"i4\" value=\"白色\" title=\"白色\">\n                </p>\n                <p class=\"size\">\n                    <s>规格：</s>\n                    <span class=\"avenge\"\n                        style=\"border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);\">15寸 15\n                        1T</span>\n                    <span class=\"avenge\"\n                        style=\"border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);\">18寸 18\n                        2T</span>\n                    <span class=\"avenge\"\n                        style=\"border: 1px solid rgb(102, 102, 102); color: rgb(102, 102, 102);\">19寸 19\n                        3T</span>\n                </p>\n                <div class=\"message\"></div>\n                <p class=\"account\">\n                    <s>数量：</s>\n                    <button class=\"numberMinus\">-</button>\n                    <input type=\"text\" value=\"1\" class=\"number\" id=\"buy-num\" disabled=\"disabled\">\n                    <button class=\"numberAdd\">+</button>\n                </p>\n                <div class=\"shops\">\n                    <a href=\"javascript:\" class=\"buy lf\" id=\"buy_now\">立即购买</a>\n                    <a href=\"javascript:\" class=\"shop lf\" id=\"add_cart\">\n                        <img src=\"../img/product_detail/product_detail_img7.png\" alt=\"\">加入购物车\n                    </a>\n                    <a href=\"javascript:\" class=\"collection lf\" id=\"collect\">\n                        <span>收藏</span>\n                        <b><img src=\"../img/product_detail/product_detail_img6.png\" alt=\"\"></b>\n                    </a>\n                </div>\n            </div>\n        `;\n});\n\n//# sourceURL=webpack:///./src/common/htmljs/detail_html.js?");

/***/ }),

/***/ "./src/common/htmljs/footer-html.js":
/*!******************************************!*\
  !*** ./src/common/htmljs/footer-html.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return `\n        <div class=\"footer-container1\">\n            <div class=\"footer1\">\n                <div>\n                    <img src=\"../img/footer/icon1.png\" alt=\"1\">\n                    <p>品质保障</p>\n                </div>\n                <div>\n                    <img src=\"../img/footer/icon2.png\" alt=\"1\">\n                    <p>私人定制</p>\n                </div>\n                <div>\n                    <img src=\"../img/footer/icon3.png\" alt=\"1\">\n                    <p>学生特供</p>\n                </div>\n                <div>\n                    <img src=\"../img/footer/icon4.png\" alt=\"1\">\n                    <p>专属特权</p>\n                </div>\n            </div>\n        </div>\n        <div class=\"footer-container2\">\n            <div class=\"footer2\">\n                <div>\n                    <p>\n                        <img src=\"../img/footer/log.png\" alt=\"\">\n                    </p>\n                    <p>\n                        <img src=\"../img/footer/footerFont.png\" alt=\"\">\n                    </p>\n\n                </div>\n                <div>\n                    <ul>\n                        <li><a href=\"#\">\n                                <h3>买家帮助</h3>\n                            </a>\n\n                        </li>\n                        <li><a href=\"#\">新手指南</a></li>\n                        <li><a href=\"#\">服务保障</a></li>\n                        <li><a href=\"#\">常见问题</a></li>\n                    </ul>\n                    <ul>\n                        <li>\n                            <a href=\"#\">\n                                <h3>商家帮助</h3>\n                            </a>\n                        </li>\n                        <li><a href=\"#\">商家入驻</a></li>\n                        <li><a href=\"#\">商家后台</a></li>\n                    </ul>\n                    <ul>\n                        <li><a href=\"#\">\n                                <h3>关于我们</h3>\n                            </a>\n\n                        </li>\n                        <li><a href=\"#\">关于达内</a></li>\n                        <li><a href=\"#\">联系我们</a></li>\n                        <li>\n                            <a href=\"#\"><img src=\"../img/footer/wechat.png\" alt=\"\"></a>\n                            <a href=\"\"><img src=\"../img/footer/sinablog.png\" alt=\"\"></a>\n                        </li>\n                    </ul>\n                </div>\n                <div>\n                    <p>\n                        学子商城客户端\n                    </p>\n                    <img src=\"../img/footer/ios.png\" alt=\"\"><br>\n                    <img src=\"../img/footer/android.png\" alt=\"\">\n                </div>\n                <div>\n                    <img src=\"../img/footer/erweima.png\" alt=\"\">\n                </div>\n                <div>\n                    ©2017 达内集团有限公司 版权所有 京ICP证00000000000000001P\n                </div>\n            </div>\n        </div>\n\n    `;\n});\n\n//# sourceURL=webpack:///./src/common/htmljs/footer-html.js?");

/***/ }),

/***/ "./src/common/htmljs/header-html.js":
/*!******************************************!*\
  !*** ./src/common/htmljs/header-html.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n页面分为三部分  头部 header  主题 container  底部 footer 三个div;\r\n此功能放在 < div class = \"header\"id = 'floor3' > 中 id为页面滚动导航;\r\n\r\n此div的位置属于页面头部;\r\n\r\n对应acts_js  为  js/acts_js/header.js;\r\n对应的less 为 less/acts_less/header.less;\r\n*/\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return `<div class=\"iframe\">\n            <div class=\"row header-top\">\n\n                <!--1图标列-->\n                <div class=\"col-xs-2 left-l\">\n                    <a href=\"javascript: location='/index.html'\" target=\"_parent\"><img src=\"../img/footer/log.png\" alt=\"图标\" /></a>\n                </div>\n\n                <!-- 2搜索input框列-->\n                <div class=\"col-xs-5 midl-m textArea\">\n                    <!--2.1搜索框-->\n                    <input type=\"text\" class=\"txtSearch\" placeholder=\"请输入您要搜索的内容\">\n                    <!--2.2分类搜索-->\n                    <a href=\"javascript:\" class=\"sortSearch\">分类搜索</a>\n\n                    <!--2.4放大镜的搜索图片-->\n                    <img class=\"searchImg\" src=\"../img/header/search.png\" data-trigger=\"search\">\n\n                    <!--2.3倒三角-->\n                    <i class=\"caret\"></i>\n                    <!-- 隐藏的搜索帮助 -->\n                    <ul class=\"shelper top\" style=\"display: none;\">\n                    </ul>\n                </div>\n\n                <!--3导航列-->\n                <div class=\"col-xs-4 right-r\">\n                    <ul class=\"list-inline list-l\">\n                        <li>\n                            <a href=\"javascript:location='/html/favorite.html'\" target=\"_parent\">\n                                <img src=\"../img/header/care.png\" \n                                data-pass title = \"已收藏商品\">\n                            </a>\n                            <b>|</b>\n                        </li>\n                        <li>\n                            <a href=\"javascript:location='/html/orders.html'\" target=\"_parent\">\n                                <img src=\"../img/header/order.png\" \n                                data-pass title = \"订单详情\">\n                            </a>\n                            <b>|</b>\n                        </li>\n                        <li>\n                            <a href=\"javascript:location='/html/cart.html'\" >\n                                <img src=\"../img/header/shop_car.png\"\n                                data-pass title=\"购物车\">\n                            </a>\n                            <b>|</b>\n                        </li>\n                        <li>\n                            <a href=\"javascript: location='/html/register.html'\" data-ur='sele'>注册</a>\n                            <b>|</b>\n                        </li>\n                        <li>\n                            <a href = \"javascript: location='/html/login.html'\"> 登录 </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>`;\n});\n\n//# sourceURL=webpack:///./src/common/htmljs/header-html.js?");

/***/ }),

/***/ "./src/common/htmljs/hiden_header-html.js":
/*!************************************************!*\
  !*** ./src/common/htmljs/hiden_header-html.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n此div为楼层滚动显示的div\r\n在页面位置为独立位置 不属于任何页面部分  \r\n在footer之上就可以  常态display：none\r\n其行为js  在js/acts/header.js中\r\nless样式为less/actsLess/hiden-header.less\r\n*/\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return `<!-- 滚动显示的搜索框 -->\n        <div class='hiden-header row'>\n            <!--1图标列-->\n            <div class=\"col-xs-2 left-l\">\n                <a href=\"../index.html\" target=\"_parent\"><img src=\"../img/footer/log.png\" alt=\"图标\" /></a>\n            </div>\n\n            <!-- 2搜索input框列-->\n            <div class=\"col-xs-5 midl-m\">\n                <!--2.1搜索框-->\n                <input type=\"text\" class=\"txtSearch\" placeholder=\"请输入您要搜索的内容\">\n                <!--2.2分类搜索-->\n                <a href=\"#\" class=\"sortSearch\">分类搜索</a>\n\n                <!--2.4放大镜的搜索图片-->\n                <img class=\"searchImg\" src=\"../img/header/search.png\" data-trigger=\"search\">\n\n                <!--2.3倒三角-->\n                <i class=\"caret\"></i>\n                <!-- 隐藏的搜索帮助 -->\n                <ul class=\"shelper hiden\" style=\"display: none;\">\n                </ul>\n            </div>\n        </div>`;\n});\n\n//# sourceURL=webpack:///./src/common/htmljs/hiden_header-html.js?");

/***/ }),

/***/ "./src/common/htmljs/login_modal-html.js":
/*!***********************************************!*\
  !*** ./src/common/htmljs/login_modal-html.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n页面分为三部分  头部 header  主题 container  底部 footer 三个div;\r\n此功能放在  <div class=\"login-modal\">  中;\r\n\r\n<div class = \"login-modal\">此div的位置在页面的 container 和 footer 之间，不属于任何页面部分;\r\ndiv.login-modal此div display为none;\r\n对应acts_js  为  js/acts_js/login-modal.js;\r\n对应的less 为 less/acts_less/login-modal.less;\r\n\r\n*/\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return `<div class=\"login-table\">\n            <button>X</button>\n            <p>\n                登录解锁功能\n                <span>\n                    <a href=\"html/register.html\">新用户注册</a>\n                </span>\n            </p>\n            <div class=\"user\">\n                <input type=\"text\" placeholder=\"请输入用户名\">\n                <span>\n                    <img src=\"../img/register/yhm.png\" alt=\"\">\n                </span>\n                <div data-type=0></div>\n            </div>\n            <div class=\"pwd\">\n                <input type=\"password\" placeholder=\"请输入密码\">\n                <span>\n                    <img src=\"../img/register/mm.png\" alt=\"\">\n                </span>\n                <div data-type=0></div>\n            </div>\n            <div class=\"chose\">\n                <label>\n                    <input type=\"checkbox\">\n                    :自动登录\n                </label>\n                <span>\n                    <a href=\"#\">忘记密码?</a>\n                </span>\n            </div>\n            <input type=\"button\" value=\"登录\">\n            <div></div>\n        </div>`;\n});\n\n//# sourceURL=webpack:///./src/common/htmljs/login_modal-html.js?");

/***/ }),

/***/ "./src/js/product_details.js":
/*!***********************************!*\
  !*** ./src/js/product_details.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_htmljs_header_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/htmljs/header-html */ \"./src/common/htmljs/header-html.js\");\n/* harmony import */ var _common_htmljs_hiden_header_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/htmljs/hiden_header-html */ \"./src/common/htmljs/hiden_header-html.js\");\n/* harmony import */ var _common_htmljs_login_modal_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/htmljs/login_modal-html */ \"./src/common/htmljs/login_modal-html.js\");\n/* harmony import */ var _common_htmljs_footer_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/htmljs/footer-html */ \"./src/common/htmljs/footer-html.js\");\n/* harmony import */ var _common_htmljs_detail_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/htmljs/detail_html */ \"./src/common/htmljs/detail_html.js\");\n//引入头部html代码片段 并插入页面指定位置\n //引入隐层的头部 并插入指定位置\n\n //引入登录对话框  并插入指定位置\n\n //引入footerhtml\n\n //引入商品展示html\n\n\n\n__webpack_require__(/*! ../less/index.less */ \"./src/less/index.less\");\n\n$('#floor3').html(Object(_common_htmljs_header_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n$(Object(_common_htmljs_hiden_header_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()).insertBefore($('div.footer'));\n$('div.login-modal').html(Object(_common_htmljs_login_modal_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\n$('div.footer').html(Object(_common_htmljs_footer_html__WEBPACK_IMPORTED_MODULE_3__[\"default\"])()); //引入登录js\n\n__webpack_require__(/*! ../common/atcsjs/login_modal */ \"./src/common/atcsjs/login_modal.js\"); //引入头部header.js\n\n\n__webpack_require__(/*! ../common/atcsjs/header */ \"./src/common/atcsjs/header.js\"); //根据lid查找商品详情\n\n\n$(() => {\n  let lid = location.search.split('=')[1];\n  $.get('/product/details', {\n    lid: lid\n  }).then(data => {\n    let detail = data[0][0],\n        pic = data[1]; //向页面添加商品展示内容 价格等等。。。。。\n\n    $('div.shop-detail>div.rg').html(Object(_common_htmljs_detail_html__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(detail)); //换左侧展示图\n\n    $('div.lg-png>img').attr('src', `${'../' + pic[0].md}`);\n\n    for (let i = 0; i < 5; i++) {\n      $(`div.sm-png>ul>li:nth-child(${i + 1})`).children('img').attr('src', `${'../' + pic[i].sm}`);\n    }\n  });\n}); //小图单机改变大图的单击事件\n\n$(() => {\n  $('div.shop-detail>div.lf>div.sm-png>ul').on('click', 'li', e => {\n    let arr = $(e.target).attr('src').split('/'),\n        arr1 = [];\n    arr.forEach(ele => {\n      if (ele == 'sm') {\n        ele = 'md';\n      }\n\n      arr1.push(ele);\n    });\n    $('div.shop-detail>div.lf>div.lg-png>img').attr('src', arr1.join('/'));\n  });\n}); //商品购物展示区 的一些小的单机事件\n\n$(() => {\n  //颜色选择\n  $('div.shop-detail>div.rg').on('click', 'input[type=button]', e => {\n    $(e.target).addClass('selected').siblings('input').removeClass('selected');\n  }); //尺寸选择\n\n  $('div.shop-detail>div.rg').on('click', 'span.avenge', e => {\n    $(e.target).addClass('selected').siblings('span').removeClass('selected');\n  }); //数量的选择\n\n  $('div.shop-detail>div.rg').on('click', 'button', e => {\n    let $e = $(e.target),\n        input = $e.siblings('input'); //console.log($e.text())\n\n    if ($e.text() == '-') {\n      input.val(input.val() - 1);\n    } else {\n      input.val(Number(input.val()) + 1);\n    }\n\n    if (input.val() <= 0) input.val(1);\n  }); //立即购买\n\n  $('div.shop-detail>div.rg').on('click', 'a.buy', e => {\n    $.get('/islogin').then(data => {\n      if (data.code < 0) {\n        $('div.login-modal').css('display', 'block');\n      } else {\n        let lid = Number(location.search.split('=')[1]) || '',\n            color = $('p.choose_color>input.selected').val() || 0,\n            count = parseInt($('p.account>input').val()),\n            size = $('p.size>span.selected').html() || 0,\n            price = parseInt($('div.pro_price>span').html().slice(1)); //console.log(lid, color, count, size)\n\n        if (lid !== '' && color != 0 && count >= 1 && size != 0) {\n          location = `/html/orderPay.html?lid=${lid}&count=${count}&size=${size}&price=${price}`;\n        } else {\n          $('div.rg div.message').html('<span>请选择此栏内选项进行购买<span>').show();\n          setTimeout(() => {\n            $('div.rg div.message').hide(500);\n          }, 1500);\n        }\n      }\n    });\n  }); //加入购物车\n\n  $('div.shop-detail>div.rg').on('click', 'a.shop', e => {\n    $.get('/islogin').then(data => {\n      if (data.code < 0) {\n        $('div.login-modal').css('display', 'block');\n      } else {\n        let lid = Number(location.search.split('=')[1]) || '',\n            color = $('p.choose_color>input.selected').val() || 0,\n            count = parseInt($('p.account>input').val()),\n            size = $('p.size>span.selected').html() || 0;\n        console.log(lid, color, count, size);\n\n        if (lid !== '' && color != 0 && count >= 1 && size != 0) {\n          $.get('/cart/verify').then(data => {\n            let idArr = [];\n\n            for (let ele of data) {\n              idArr.push(ele.product_id);\n            }\n\n            let i = idArr.indexOf(lid); //console.log(i, idArr.length)\n\n            if (idArr.length !== 0 && i != -1) {\n              $('div.rg div.message').html('<span>此商品已加入购物车，请在购物车内查找<span>').show();\n              setTimeout(() => {\n                $('div.rg div.message').hide(500);\n              }, 1500);\n            } else {\n              $.get('/cart/insert', {\n                lid: lid\n              }).then(() => {\n                $('div.rg div.message').html('<span>商品已加入购物车<span>').show();\n                setTimeout(() => {\n                  $('div.rg div.message').hide(500);\n                }, 1500);\n              });\n            }\n          });\n        } else {\n          $('div.rg div.message').html('<span>请选择此栏内选项，让我们更了解您<span>').show();\n          setTimeout(() => {\n            $('div.rg div.message').hide(500);\n          }, 1500);\n        }\n      }\n    });\n  }); ////收藏\n\n  $('div.shop-detail>div.rg').on('click', 'a.collection', e => {\n    $.get('/islogin').then(data => {\n      if (data.code < 0) {\n        $('div.login-modal').css('display', 'block');\n      } else {\n        let lid = Number(location.search.split('=')[1]) || '',\n            color = $('p.choose_color>input.selected').val() || 0,\n            count = parseInt($('p.account>input').val()),\n            size = $('p.size>span.selected').html() || 0;\n        console.log(lid, color, count, size);\n\n        if (lid !== '' && color != 0 && count >= 1 && size != 0) {\n          $.get('/cart/favorite').then(data => {\n            let idArr = [];\n\n            for (let ele of data) {\n              idArr.push(ele.product_id);\n            }\n\n            let i = idArr.indexOf(lid); //console.log(i, idArr.length)\n\n            if (idArr.length !== 0 && i != -1) {\n              $('div.rg div.message').html('<span>此商品已收藏过，请在收藏夹内查找<span>').show();\n              setTimeout(() => {\n                $('div.rg div.message').hide(500);\n              }, 1500);\n            } else {\n              $.get('/cart/favorInsert', {\n                lid: lid\n              }).then(() => {\n                $('div.rg div.message').html('<span>商品已加入收藏夹<span>').show();\n                setTimeout(() => {\n                  $('div.rg div.message').hide(500);\n                }, 1500);\n              });\n            }\n          });\n        } else {\n          $('div.rg div.message').html('<span>请选择此栏内选项，让我们更了解您<span>').show();\n          setTimeout(() => {\n            $('div.rg div.message').hide(500);\n          }, 1500);\n        }\n      }\n    });\n  }); //加入购物车的第二个按钮\n\n  $('div.iteminfo div.cart.rt').click(() => {\n    // let scrollTop = document.documentElement.scrollTop ||\n    //     document.body.scrollTop\n    $('html').stop(true).animate({\n      //防止动画叠加\n      scrollTop: 0\n    }, 500);\n    $('div.shop-detail>div.rg a.shop').click();\n  });\n}); //广告轮播\n\n$(() => {\n  let a = 0,\n      bannerMove = () => {\n    a += 2;\n\n    if (a > 960) {\n      a = 0;\n      $('div.demo>div.surface>div.indemo').css({\n        transition: 'none',\n        left: `-${a}px`\n      });\n      return;\n    }\n\n    $('div.demo>div.surface>div.indemo').css({\n      transition: 'all .05s linear',\n      left: `-${a}px`\n    });\n  },\n      timer = setInterval(() => {\n    bannerMove();\n  }, 50);\n\n  $('div.demo>div.surface>div.indemo').on('mouseenter', () => {\n    clearInterval(timer);\n  });\n  $('div.demo>div.surface>div.indemo').on('mouseleave', () => {\n    timer = setInterval(() => {\n      bannerMove();\n    }, 50);\n  }); //clearInterval(timer)\n}); //楼层滚动定位\n\n$(() => {\n  $(window).scroll(() => {\n    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;\n    let offsetTop = $('div.iteminfo').offset().top;\n\n    if (scrollTop >= offsetTop) {\n      $('div.iteminfo div.item').addClass('itemFixed');\n      $('div.iteminfo div.aside_nav').addClass('navFixed');\n    } else {\n      $('div.iteminfo div.item').removeClass('itemFixed');\n      $('div.iteminfo div.aside_nav').removeClass('navFixed');\n    } //console.log( offsetTop)\n\n  });\n});\n\n__webpack_require__(/*! ../less/product_details.less */ \"./src/less/product_details.less\");\n\n//# sourceURL=webpack:///./src/js/product_details.js?");

/***/ }),

/***/ "./src/less/index.less":
/*!*****************************!*\
  !*** ./src/less/index.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/less/index.less?");

/***/ }),

/***/ "./src/less/product_details.less":
/*!***************************************!*\
  !*** ./src/less/product_details.less ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/less/product_details.less?");

/***/ })

/******/ });