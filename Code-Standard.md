### Code Convention

1. (Forbidden) **Do not start or end with underscores** or **dollar signs**.
   
   Bad example: `_name` / `$name` / `name_` / `name_`

2. (Mandatory) **Class names** should follow the **UpperCamelCase** convention.

3. (Mandatory) **Constants** must be in all uppercase letters with words separated by underscores and their meaning must be complete. No magic values allowed.
   
   Good example: `MAX_STOCK_COUNT`

4. (Mandatory) **Function and variable names** must be meaningful, preferably using full words. For multiple words, use the **findMyName** format. Avoid unnecessary ambiguity.
   
   Bad example: `abcxyz` / `name1` / `name2` / `num1` / `num2`

5. (Mandatory) Decoupling: A function should only implement one functionality.

6. (Recommended) Methods and properties in interface classes should not have any access modifiers. Avoid defining variables in interfaces.

7. (Recommended) A single function should ideally not exceed 50 lines of code.

8. (Recommended) A single line of code should ideally not exceed 80 characters. You can break the line and indent for better readability.

### Logical Convention

1. (Recommended) Methods for getting a single object should use the `get` prefix.

2. (Recommended) Methods for getting multiple objects should use the `list` prefix.

3. (Recommended) Methods for getting a count should use the `count` prefix.

4. (Recommended) Methods for inserting should use the `insert` prefix.

5. (Recommended) Methods for deleting should use the `delete` prefix.

6. (Recommended) Methods for updating should use the `update` prefix.

7. (Recommended) When using conditional statements such as `if`, the logical condition should be extracted separately. If the condition is complex, it should be extracted into a **function**.

   Good example:
```Java
boolean existed = (file.open() != null) && () || ();

if (existed) {

    ...

}
// or
if (FileExisted(file, ···)) {

    ···

}
```

8. (Mandatory) Values that cannot be modified and non-callable functions must be encapsulated.

9. (Mandatory) Avoid memory leaks.

10. (Mandatory) Avoid lower-level classes calling functions from higher-level classes.

### Code Formatting

1. (Mandatory) Curly Braces:
   
   Do not place a line break before the opening curly brace, but do so after it.
   
   Insert a line break before the closing curly brace, but do not insert one if followed by an `else` statement or similar. If it marks the end of a block, insert a line break.

2. (Mandatory) Operators must have spaces around them (one at left and one at right).

3. (Mandatory) Use 4 spaces for indentation, do not use tabs.

4. (Mandatory) There must be a space after the `//` in comments.

### Commenting Convention

1. (Mandatory) Class, class properties, and class methods should be commented using `/**content*/`. Do not use `// xxx`.

2. (Mandatory) Abstract methods (including interface methods) must be commented.

3. (Mandatory) Single-line comments inside methods should be preceded by an empty line, using `//`. Multi-line comments should use `/* */`.

4. (Reference) Self-explanatory code does not need comments.

5. (Reference) Special comments:
   
   - `TODO`: It's best to include (who will handle it, when it was noted, and expected completion date).
   - `FIXME`: It's best to include (who will handle it, when it was noted, and expected completion date).

### GitHub Convention

1. (Mandatory) Each person should work on their own `branch`, with the branch name being the **module/feature** name. If there is no meaningful name, use their first name's initial in uppercase.

2. (Mandatory) Code must be validated and verified before being merged to ensure it runs properly.

3. (Mandatory) `Commit` messages should clearly describe the content or changes made. Be as detailed as possible.

4. (Mandatory) Use `cherry-pick` for picking other commits into a new branch. Do not copy and paste code.

5. (Recommended) Avoid large single commits. Instead, make multiple commits for better manageability and readability.