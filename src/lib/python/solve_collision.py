from sympy.core.symbol import symbols
from sympy.solvers.solveset import nonlinsolve
import json
import sys

symbol_dict = json.loads(sys.argv[1])
unknown_list = json.loads(sys.argv[2])
precision = int(sys.argv[3])

for unknown in unknown_list:
    symbol_dict[unknown] = symbols(unknown)

conservation_of_momentum = ((symbol_dict["m1i"]*symbol_dict["v1i"]) + (symbol_dict["m2i"]*symbol_dict["v2i"])) - ((symbol_dict["m1f"]*symbol_dict["v1f"]) + (symbol_dict["m2f"]*symbol_dict["v2f"]))
relative_speed = ((symbol_dict["v1f"] - symbol_dict["v2f"]) / (symbol_dict["v1i"] - symbol_dict["v2i"]))
if symbol_dict['re_positive']:
    relative_speed += symbol_dict["re"]
else:
    relative_speed -= symbol_dict["re"]

solution = nonlinsolve([conservation_of_momentum, relative_speed], unknown_list)

solution_pp = {}

for i,v in enumerate((unknown_list)):
    solution_pp[v] = round(float(list(solution)[0][i]), precision)

    # Make sure the coefficient of restitution is positive
    if (v == "re"):
        solution_pp[v] = round(abs(solution_pp[v]), precision)

print(json.dumps(solution_pp))

# Test: python3 src/lib/python/solve_collision.py '{"m1i":1,"m1f":1,"v1i":1,"m2i":2,"m2f":2,"v2i":0,"re":1, "re_positive": true}' '["v1f","v2f"]'