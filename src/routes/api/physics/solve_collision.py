from sympy.core.symbol import symbols
from sympy.solvers.solveset import nonlinsolve

symbol_name_list = ["m1i", "m1f", "v1i", "v1f", "m2i", "m2f", "v2i", "v2f", "re"]
known_symbol_names = {
    "m1i": 1,
    "m1f": 1,
    "v1i": 1,
    "m2i": 2,
    "m2f": 2,
    "v2i": 0,
    "re": 1
}

symbol_dict = {}
unknown_list = []

for name in symbol_name_list:
    if name in known_symbol_names:
        symbol_dict[name] = known_symbol_names[name]
    else:
        symbol_dict[name] = symbols(name)
        unknown_list.append(symbol_dict[name])

conservation_of_momentum = ((symbol_dict["m1i"]*symbol_dict["v1i"]) + (symbol_dict["m2i"]*symbol_dict["v2i"])) - ((symbol_dict["m1f"]*symbol_dict["v1f"]) + (symbol_dict["m2f"]*symbol_dict["v2f"]))
relative_speed = (symbol_dict["v1i"] - symbol_dict["v2i"]) - symbol_dict["re"] * (symbol_dict["v1f"] - symbol_dict["v2f"])

solution = nonlinsolve([conservation_of_momentum, relative_speed], unknown_list)

solution_pp = {}

for i,v in enumerate((unknown_list)):
    solution_pp[v] = list(solution)[0][i]

print(solution_pp)