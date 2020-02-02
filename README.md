
# NEW ! First follow algorithms 

# LanguageFormatter http://students.info.uaic.ro/~ionut.oancea/

E-NFA to DFA automata convertor
The algorithm is based on the one presented in the LFAC-UAIC course

Conditions for proper use :
The starting simbol is defines by havng "s" in front of the state id and the final one with "f" in front of the state id
The first state inside the table should be the starting state
Inside the input table only numeric values can be given, each one representing the id of the state which they go to ( ex: q1's id would be 1 )
Each id inside the table should have a coresponding state, otherwise an error will pop out
As this is an epsilon transitions automata, it needs to have at least, one state going out with ε otherwise an error will pop out
The name and index of each state is automatically generated, when pressing the "+" icon coresponding to the rows of the table
