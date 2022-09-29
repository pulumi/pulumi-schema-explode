# Pulumi Schema Explode

A simple tool for exploding large schemas into smaller files.

## Quick Start

```md
pulumi-schema <command>

Commands:
  pulumi-schema explode [schema]      Convert a schema file into files & folders
  pulumi-schema implode [options...]  Pack files and folders into schema file
  pulumi-schema test [schema]         Test impact of explode/implode
  pulumi-schema validate [schema]     Validate schema for errors
```

## Developing

- `yarn install` - restore dependencies
- `yarn cmd [option]` - run command line tool from source (see options above)
- `yarn test` - run unit tests & check typescript
- `yarn build` - produce pkg and cmd build assets

## Design Notes

- Separate top level files into:
  - `base` - most basic top-level keys
  - `config` - config properties
  - `provider` - provider object
  - `language.[LANG]` - per-language settings
- Group resources, functions and types into per-module folders
- Split long descriptions into their own markdown file alongside

## Issues

### Case sentitivity

We have two types in azure-native which only vary by case:

```
azure-native:network:IpAllocationMethod
azure-native:network:IPAllocationMethod
                      ^
```

This causes one file to overwrite the other. This likely also affects codegen too. The types have the same structure so doesn't really cause an actual issue.
