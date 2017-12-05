var b = function (arg0, arg1, arg2) {
    return console.log('DONE');
};

var use = function (NS, fn, index, erase, dontKeep) {

    function applyMiddlewares(scope, callBack, arg0, arg1, arg2, arg3) {
        var queueIndex = -1;

        function next(arg0, arg1, arg2, arg3) {
            queueIndex++;

            if (scope[queueIndex - 1] && scope[queueIndex - 1].dontKeep) {
                scope.splice(queueIndex - 1, 1);
                queueIndex--;
            }

            if (scope.length === queueIndex) {
                queueIndex = 0;
                return callBack(arg0, arg1, arg2, arg3);
            }

            return scope[queueIndex].next(next, arg0, arg1, arg2, arg3);
        };

        next();
    }

    function getPath(path) {

        var computedPath = window;
        for (var i = 0, len = path.length - 1; i < len; i++) {
            computedPath = computedPath[path[i]];
        }

        return computedPath;
    }

    var splittedPath = NS.split('.');
    var path = getPath(splittedPath);
    var method = splittedPath[splittedPath.length - 1];

    var _origin = path[method];

    method = path[method] = function (arg0, arg1, arg2, arg3) {
        return applyMiddlewares(method._middlewares, _origin, arg0, arg1, arg2, arg3);
    };
    method._origin = method._origin || _origin;
    method._middlewares = method._origin && method._origin._middlewares || [];


    var middlewares = fn;

    if (method._middlewares[index] && erase) {
        method._middlewares[index] = {
            next: fn,
            dontKeep: dontKeep
        };

        return b;
    }

    if (index && index < method._middlewares.length) {
        method._middlewares.unshit({
            next: fn,
            dontKeep: dontKeep
        });

        return b;
    }

    if (index && index > method._middlewares.length) {
        method._middlewares.push({
            next: fn,
            dontKeep: dontKeep
        });

        return b;
    }

    method._middlewares.splice(index || method._middlewares.length, 0, {
        next: fn,
        dontKeep: dontKeep
    });


    return b;


};
