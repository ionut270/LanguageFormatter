/**
 * How do we represent an automata
 * Well we have nodes and pointers to each one of those
 * We could represent a graph as an object
 */

function parse_input(input) {
	//input = "S->aAd|bAB , A->cA|c , B->d";
	//Maybe allow special caracters in case a char is before and after it ?
	let regExp = {
		separator: new RegExp(/\s*,+\s*|\s*\n+\s*/),
		transition: new RegExp(/\s*->\s*|\s*=>?\s*/),
	};
	//input is a string
	//Split the input based on the number of transtitions
	/**
	 * We can have , ; / \n \s as separators
	 */
	input = input.split(regExp.separator);

	let parsed_input = {
		terminals: [],
		nonterminals: [],
		transitions: [],
	};

	//console.log(`Mapping input ${input} ... `);
	input.map((transition) => {
		//extract all avaiable data
		let from = transition.split(regExp.transition)[0];

		let to = transition.split(regExp.transition)[1];
		//from is most likely an nonterminal so we construct its object
		parsed_input.nonterminals.push({ id: from, type: "nonterminals" });
		//to is a bit more complex, its formed out of both terminals and nonterminals
		//We get the terminals
		let terminals = to.split(/[A-Z|]*/);
		terminals.pop();
		//push it into the input arr
		terminals.map((terminal) => {
			if (parsed_input.terminals.indexOf({ id: terminal, type: "terminals" }) === -1) {
				parsed_input.terminals.push({ id: terminal, type: "terminals" });
			}
		});
		//Now we have to parse our operation considering we may have a | separation
		let or = to.split(/\|/);
		//console.log(`Mapping or ${or} ... `);
		or.map((to) => {
			//we have a from, we have a to we only need to separate these 2
			//aAd have to split them into 3 arrays
			//console.log(`Parsing ${to}`);
			let parsed_to = [];
			for (let j = 0; j < to.length; j++) {
				//console.log(`Character ${to[j]}`);
				if (to[j].match(/[A-Z]/)) {
					//console.log(`${to[j]} is a nonterminal`);
					//nonterminal
					parsed_to.push({ id: to[j], type: "nonterminals" });
				} else {
					//terminal
					//console.log(`${to[j]} is a terminal`);
					parsed_to.push({ id: to[j], type: "terminals" });
				}
			}
			//console.log(`Final parsed_to is ${JSON.stringify(parsed_to)}`);
			//push into our transitions
			parsed_input.transitions.push({
				from: { id: from, type: "nonterminals" },
				to: parsed_to,
			});
		});
		return;
	});
	return parsed_input;
}

function FIRST(G, input) {
	/**We have to go trough the transitions */
	let redefined_input = [];
	if (input !== undefined) {
		//Search all transitions containing this input as a root
		for (let i = 0; i < G.transitions.length; i++) {
			//console.log(`Checking transition number ${i} ... `)
			if (G.transitions[i].from.id === input) {
				redefined_input.push(G.transitions[i]);
			}
		}
	}
	//console.log(`Found the following transitions I have to go trough ${JSON.stringify(redefined_input)}`)
	let response = "";
	redefined_input.map((transition) => {
		//console.log(`Analazing transition ${JSON.stringify(transition)}`);
		if (transition.to[0].type === "nonterminals") {
			//console.log(`Going recursively with ${transition.to[0].id}`)
			if (input !== transition.to[0].id) {
				response+= FIRST(G, transition.to[0].id);
			}
		} else {
			//console.log(`Pushing ${JSON.stringify(transition.to[0])}, index of is ${response.indexOf(transition.to[0])} and my response is ${JSON.stringify(response)}`);
			let exists = false;
			for (let i = 0; i < response.length; i++) {
				if (response[i].id === transition.to[0].id) {
					exists = true;
				}
			}
			if (exists) {
				//console.log(`We have this element allready ${JSON.stringify(transition.to[0])}`)
			} else {
				response+= transition.to[0].id  + " , ";
			}
		}
	});
	return response;
}

function FOLLOW(G, input) {
	//lOOOKUP TROUGH G
	/**We have to go trough the transitions */
	let redefined_input = [];
	let response = "";

	if(input === "S"){
		response += "ε , "
	}

	if (input !== undefined) {
		//Search all transitions containing this input as a root
		G.transitions.map((transition, i) => {
			transition.to.map((to, j) => {
				//if One of those to's is what we need
				if (to.id === input) {
					redefined_input.push(G.transitions[i]);
				}
			});
		});
	}
	//Now we dhould go trough out set of transitions
	//console.log(`Going trough the folowing transitions ...`, redefined_input);
	redefined_input.map((transition) => {
		for (let i = 0; i < transition.to.length; i++) {
			if (transition.to[i].id === input) {
				/**
				 * Trouble cases 
				 * No followup ... 
				 * Followup is epsilon
				 * Followup is a nonterminal
				 * 
				 * Basic case default 
				 * followup is a terminal ... 
				 */
				//Default 
				let source = transition.to[i];
				let follow_up = transition.to[i+1]
				let from = transition.from.id;
				if(follow_up){ // if we have a followup at all
					// as we cant have transition to char char epsilon that will remain as a special case for later
					//follow up is a terminal
					if(follow_up.type === "terminals"){
						response += follow_up.id + " , "
					} else { // followup is a nonterminal
						let nonterminal_first = FIRST(G,follow_up.id);
						if(nonterminal_first.match(/ε/)){
							//we have to destroy it ... 
							//a , b , c , ε , .splice(/ , $/).split(/ , /) [a,b,c,ε]
							//console.log(nonterminal_first);
							let first_arr = nonterminal_first.split(/ , $/)[0].split(/ , /);
							first_arr.map(terminal=>{
								if(terminal === "ε"){
									//In case one of the terminals is epsilon we have to perform the same action on the next terminal
									if(follow_up.id === "S"){
										response += "ε , " + FOLLOW(G,follow_up.id) + " , "
									} else {
										response += FOLLOW(G,follow_up.id) + " , "
									}
										//console.log(`Performing FOLLOW(G,${follow_up.id}) = ${FOLLOW(G,follow_up.id)}`)
								} else {
									if(!response.match(terminal)){
										response += terminal + " , "
									}
								}
							})
						} else {
							response += nonterminal_first + " , "
						}
					}

				} else { //otherwise we run FOLLOW on the parent
					if(from === source.id ) { // case in which the parent is the input 
						//in this case nothing should be done otherwise a we'll be stuck in a loop
					} else {
						response += FOLLOW(G,from) + " , ";
					}
				}
			}
		}
	});

	//before returning remove duplicates ...
	let no_duplicates_res = ""
	console.log(response);
	response = response.split(/ $/)[0].split(/\s?,\s?/)
	response.map(res=>{
		if(res!==" " && res!=="" && no_duplicates_res.indexOf(res) === -1){
			no_duplicates_res += res + " , ";
		}
	})
	return no_duplicates_res;
}

module.exports = {
	parse_input: parse_input,
	FIRST: FIRST,
	FOLLOW: FOLLOW,
};
