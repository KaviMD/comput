from sympy.core.symbol import symbols
from sympy.solvers.solveset import nonlinsolve
import json
import sys

symbol_dict = json.loads(sys.argv[1])
unknown_list = json.loads(sys.argv[2])

for unknown in unknown_list:
    symbol_dict[unknown] = symbols(unknown)

momentum_equation = (symbol_dict["m"]*symbol_dict["v"]) - symbol_dict["p"]
kinetic_energy_equation = (symbol_dict["m"]*symbol_dict["v"]**2)/2 - symbol_dict["e"]

solution = nonlinsolve([momentum_equation, kinetic_energy_equation], unknown_list)

solution_pp = {}

for i,v in enumerate((unknown_list)):
    solution_pp[v] = float(list(solution)[0][i])

print(json.dumps(solution_pp))

# Test: python3 src/lib/python/solve_object_properties.py '{"m1i":1,"m1f":1,"v1i":1,"m2i":2,"m2f":2,"v2i":0,"re":1, "re_positive": true}' '["v1f","v2f"]'