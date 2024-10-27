# justfile

# load environment variables
set dotenv-load

# variables

# aliases
alias render:=docs-build
alias preview:=docs-preview

# list justfile recipes
default:
    just --list

list:
    @docker container list -a

# docs-build
docs-build:
    @quarto render website

# docs-preview
docs-preview:
    @quarto preview website
