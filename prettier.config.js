/**
 * @type {import('prettier').Config}
 */
module.exports = {
  trailingComma: "es5",
  singleQuote: false,
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSortOrder: ["builtin", "external", "internal", "parent", "sibling", "index"],
  importOrderMergeDuplicate: true,
  importOrderCombineTypeAndValue: true,
  importOrderBuiltinModules: ["bun", "node"]
}