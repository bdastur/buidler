#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import builderutils.parser as parser

@click.group()
def cli():
    pass

@click.command()
@click.option("--configfile", type=click.Path(),
              help="Builder config", required=True)
def create(configfile):
    print "create command!"
    parserobj = parser.BuilderParser(configfile)


def main():
    cli.add_command(create)
    cli()

if __name__ == "__main__":
    main()



