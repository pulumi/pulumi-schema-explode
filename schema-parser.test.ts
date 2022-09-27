import * as parser from "./schema-types";
import * as types from "./schema-types";

const PropertySpecPrimitiveA = (
  a: types.PropertySpecPrimitive
): parser.PropertySpecPrimitive => a;
const PropertySpecPrimitiveB = (
  a: parser.PropertySpecPrimitive
): types.PropertySpecPrimitive => a;

const PropertySpecDefaultInfoA = (
  a: types.PropertySpecDefaultInfo
): parser.PropertySpecDefaultInfo => a;
const PropertySpecDefaultInfoB = (
  a: parser.PropertySpecDefaultInfo
): types.PropertySpecDefaultInfo => a;

const PropertySpecNamedA = (
  a: types.PropertySpecNamed
): parser.PropertySpecNamed => a;
const PropertySpecNamedB = (
  a: parser.PropertySpecNamed
): types.PropertySpecNamed => a;

const ComplexTypeSpecEnumA = (
  a: types.ComplexTypeSpecEnum
): parser.ComplexTypeSpecEnum => a;
const ComplexTypeSpecEnumB = (
  a: parser.ComplexTypeSpecEnum
): types.ComplexTypeSpecEnum => a;

const PrimitiveTypeEnumA = (
  a: types.PrimitiveTypeEnum
): parser.PrimitiveTypeEnum => a;
const PrimitiveTypeEnumB = (
  a: parser.PrimitiveTypeEnum
): types.PrimitiveTypeEnum => a;

const EnumValueDefinitionA = (
  a: types.EnumValueDefinition
): parser.EnumValueDefinition => a;
const EnumValueDefinitionB = (
  a: parser.EnumValueDefinition
): types.EnumValueDefinition => a;

const schemaA = (a: types.Schema): parser.Schema => a;
const schemaB = (a: parser.Schema): types.Schema => a;

const configA = (a: types.Config): parser.Config => a;
const configB = (a: parser.Config): types.Config => a;

const resourceSpecA = (a: types.ResourceSpec): parser.ResourceSpec => a;
const resourceSpecB = (a: parser.ResourceSpec): types.ResourceSpec => a;

const PropertySpecArrayA = (
  a: types.PropertySpecArray
): parser.PropertySpecArray => a;
const PropertySpecArrayB = (
  a: parser.PropertySpecArray
): types.PropertySpecArray => a;

const PropertySpecMapA = (a: types.PropertySpecMap): parser.PropertySpecMap =>
  a;
const PropertySpecMapB = (a: parser.PropertySpecMap): types.PropertySpecMap =>
  a;

const PropertySpecUnionA = (
  a: types.PropertySpecUnion
): parser.PropertySpecUnion => a;
const PropertySpecUnionB = (
  a: parser.PropertySpecUnion
): types.PropertySpecUnion => a;

const ObjectTypeSpecA = (a: types.ObjectTypeSpec): parser.ObjectTypeSpec => a;
const ObjectTypeSpecB = (a: parser.ObjectTypeSpec): types.ObjectTypeSpec => a;

const ComplexTypeSpecObjectA = (
  a: types.ComplexTypeSpecObject
): parser.ComplexTypeSpecObject => a;
const ComplexTypeSpecObjectB = (
  a: parser.ComplexTypeSpecObject
): types.ComplexTypeSpecObject => a;
