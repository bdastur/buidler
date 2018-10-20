#!/usr/bin/env python
# -*- coding: utf-8 -*-

import click
import builderutils.parser as parser
import builderutils.renderer as renderer

@click.group()
def cli():
    pass

@click.command()
@click.option("--configfile", type=click.Path(),
              help="Builder config", required=True)
def create(configfile):
    print "create command!"
    parserObj = parser.BuilderParser(configfile)
    renderObj = renderer.Renderer()
    renderObj.build_staging_environment(parserObj.parsedData)


def main():
    cli.add_command(create)
    cli()

if __name__ == "__main__":
    main()



