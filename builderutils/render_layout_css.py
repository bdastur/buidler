#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import builderutils.renderer as renderer 


GRID_ELEM_COLUMN_TEMPLATE = """
.gelem.c{{ start_column }}c{{ end_column }} {
    grid-column: {{ start_column }} / {{ end_column}};
}
"""

GRID_ELEM_ROW_TEMPLATE = """
.gelem.r{{ start_row }}r{{ end_row}} {
    grid-row: {{ start_row }} / {{ end_row}};
}
"""

def render_grid_layout(no_of_columns, no_of_rows):
    renderer_obj = renderer.Renderer() 

    for columnn_start in range(1, no_of_columns):
        for column_end in range(columnn_start + 1, no_of_columns + 1):
            obj = {
                'start_column': columnn_start,
                'end_column': column_end
            }
            renderedData = renderer_obj.render_j2_template_string(                                                                                                                 
                                GRID_ELEM_COLUMN_TEMPLATE, obj)
            print(renderedData)
    
    for row_start in range(1, no_of_rows):
        for row_end in range(row_start + 1, no_of_rows + 1):
            obj = {
                "start_row": row_start,
                "end_row": row_end
            }
            renderedData = renderer_obj.render_j2_template_string(                                                                                                                 
                                GRID_ELEM_ROW_TEMPLATE, obj)
            print(renderedData)



def main():
    if len(sys.argv) <= 2:
        print("Usage: render_layout_csss.py <column count>  <row count>")
        sys.exit(0)

    try:
        column_count = int(sys.argv[1])
        row_count = int(sys.argv[2])
        render_grid_layout(column_count, row_count)
    except  ValueError:
        print("Invalid number.")
        sys.exit(0)


if __name__ == "__main__":
    main() 
