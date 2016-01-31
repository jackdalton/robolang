%lex

%options case-insensitive

%%

\s                      /* ignore spaces */
[0-9]+("."[0-9]+)?\b    return 'NUM'
"is"                    return 'IS'
"move"                  return 'MOVE'
"up"                    return 'UP'
"down"                  return 'DOWN'
"left"                  return 'LEFT'
"right"                 return 'RIGHT'
"stay"                  return 'STAY'
"//"                    return 'COMMENT'
<<EOF>>                 return 'EOF'

/lex
%left 'IS' 'MOVE'
%left 'MOVE' 'STAY'
%left 'STAY' 'COMMENT'

%start expressions

%%

expressions
    : e EOF
        {return $1;}
    ;

e
    : NUM
        {
            $$ = Number(yytext);
        }
    | e 'IS' e
        {
            $$ = "set(\"" + $1 + "\", \"" + $2 + "\");"
        }
    | 'MOVE' e e
        {
            $$ = "move(\"" + $2 + "\", \"" + $3 + "\");";
        }
    | 'STAY' e
        {
            $$ = "stay(\"" + $2 + "\");";
        }
    | UP
        {
            $$ = "UP";
        }
    | DOWN
        {
            $$ = "DOWN";
        }
    | LEFT
        {
            $$ = "LEFT";
        }
    | RIGHT
        {
            $$ = "RIGHT";
        }
    | 'COMMENT' e
        {
            $$ = "//" + $2;
        }
    ;
