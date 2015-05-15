<% include "../common/head" %>
<script type="text/javascript" src="jscs-browser.js"></script>
<script type="text/javascript">
var checker = new JscsStringChecker();
checker.registerDefaultRules();
checker.configure({disallowMultipleVarDecl: true});
var errors = checker.checkString('var x, y = 1;');
errors.getErrorList().forEach(function(error) {
    console.log(errors.explainError(error));
});
</script>

<% include "../common/footer" %>