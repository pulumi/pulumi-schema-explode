# Pulumi Schema Explode

A simple tool for exploding large schemas into smaller files.

## Quick Start

1. `yarn install` - restore dependencies
2. `yarn test-explode` - explode all example schemas
3. `yarn test-implode` - implode all example schemas
4. `yarn json-diff examples/PROVIDER/schema.json examples/PROVIDER/schema-out.json` - test schemas for differences

## Design Notes

* Separate top level files into:
  * `base` - most basic top-level keys
  * `config` - config properties
  * `provider` - provider object
  * `language.[LANG]` - per-language settings
* Group resources, functions and types into per-module folders
* Split long descriptions into their own markdown file alongside
