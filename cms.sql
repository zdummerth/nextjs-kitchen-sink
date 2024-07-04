DROP TABLE IF EXISTS
  fields cascade;

DROP TABLE IF EXISTS
  slices cascade;

DROP TABLE IF EXISTS
  types cascade;

DROP TABLE IF EXISTS
  documents cascade;

DROP TABLE IF EXISTS
  document_slices cascade;

DROP FUNCTION
  IF EXISTS validate_slice (jsonb);

CREATE TABLE
  fields (
    id SERIAL PRIMARY KEY,
    type
      VARCHAR(20) CHECK (
        type
          IN (
            'image',
            'text',
            'link',
            'boolean',
            'select',
            'date',
            'timestamp',
            'number'
          )
      ),
      UNIQUE (
        type
      ),
      content_schema JSON,
      model_schema JSON,
      check(jsonschema_is_valid(content_schema::json)),
      check(jsonschema_is_valid(model_schema::json))
  );

CREATE TABLE
  slices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    component_name VARCHAR(255),
    model JSONB
  );

CREATE TABLE
  types (
    id SERIAL PRIMARY KEY,
    type
      VARCHAR(20) CHECK (
        type
          IN ('custom', 'page')
      ),
      reusable BOOLEAN,
      model JSONB
  );

CREATE TABLE
  documents (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10) CHECK (status IN ('draft', 'published')),
    name VARCHAR(255),
    content JSONB,
    type_id INTEGER REFERENCES types (id)
  );

CREATE TABLE
  document_slices (
    id SERIAL PRIMARY KEY,
    content JSONB,
    order_index INTEGER,
    document_id INTEGER REFERENCES documents (id),
    slice_id INTEGER REFERENCES slices (id)
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'image',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "properties": {
                "type": {
                    "const": "image"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "properties": {
                        "label": {
                            "type": "string"
                    }
                },
                "required": [
                    "label"
                ],
                "additionalProperties": false
                }
            },
            "required": [
                "type",
                "config",
                "order_index"
            ],
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "properties": {
                "type": {
                    "const": "image_content"
                },
                "url": {
                    "type": "string"
                },
                "width": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                }
            },
            "required": [
                "type",
                "url",
                "width",
                "height"
            ],
            "additionalProperties": false
        }'
  );


INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'text',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "text"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "placeholder": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value", "format"],
            "properties": {
                "type": {
                    "const": "text_content"
                },
                "value": {
                    "type": "string"
                },
                "color": {
                    "type": "string"
                },
                "format": {
                    "enum": ["h1", "h2", "h3", "h4", "h5", "h6", "paragraph", "markdown"]
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'link',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "link"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label", "select"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "select": {
                            "enum": ["external", "document"]
                        }
                    }
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "link_content"
                },
                "value": {
                    "type": "object",
                    "oneOf": [
                        {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "const": "external"
                                },
                                "url": {
                                    "type": "string"
                                }
                            },
                            "required": ["type", "url"]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "const": "document"
                                },
                                "id": {
                                    "type": "string"
                                }
                            },
                            "required": ["type", "id"]
                        }
                    ]
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'boolean',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "boolean"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "default_value": {
                            "type": "boolean"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "boolean_content"
                },
                "value": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'select',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "select"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label", "options"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "options": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "default_value": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "select_content"
                },
                "value": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'date',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "date"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "default_value": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "date_content"
                },
                "value": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'timestamp',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "timestamp"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "default_value": {
                            "type": "string"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "timestamp_content"
                },
                "value": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        }'
  );

INSERT INTO
  fields (
    type
,
      model_schema,
      content_schema
  )
VALUES
  (
    'number',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "config", "order_index"],
            "properties": {
                "type": {
                    "const": "number"
                },
                "order_index": {
                    "type": "number"
                },
                "config": {
                    "type": "object",
                    "required": ["label"],
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "default_value": {
                            "type": "number"
                        }
                    },
                    "additionalProperties": false
                }
            },
            "additionalProperties": false
        }',
    '{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["type", "value"],
            "properties": {
                "type": {
                    "const": "number_content"
                },
                "value": {
                    "type": "number"
                }
            },
            "additionalProperties": false
        }'
  );


DROP FUNCTION
  IF EXISTS validate_slice_model ();

CREATE OR REPLACE FUNCTION validate_slice_model()
RETURNS TRIGGER AS $$
DECLARE
    field_model jsonb;
    schema json;
    type_value text;
    is_field_model_valid boolean;
    invalid_models jsonb[];
BEGIN
    FOR field_model IN SELECT jsonb_array_elements(NEW.model)
    LOOP
        IF NOT jsonb_exists(field_model, 'type') THEN
            RAISE EXCEPTION 'Type field does not exist';
        END IF;
        type_value := jsonb_extract_path_text(field_model, 'type');
        schema := (SELECT model_schema FROM fields WHERE type = type_value);
        is_field_model_valid := jsonb_matches_schema(schema:= schema::json, instance := field_model::jsonb);
        IF NOT is_field_model_valid THEN
            RAISE EXCEPTION 'Invalid Slice Model: %', format('%s', field_model);
        END IF;
    END LOOP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER
  IF EXISTS validate_slice_model_trigger ON slices;

CREATE TRIGGER validate_slice_model_trigger
BEFORE INSERT ON slices
FOR EACH ROW
EXECUTE PROCEDURE validate_slice_model();


INSERT INTO
  slices (
    name,
    component_name,
    model
  ) VALUES (
    'Image With Content',
    'image-with-content.tsx',
    '[
        {
            "type": "text",
            "order_index": 0,
            "config": {
                "label": "Title",
                "placeholder": "Enter title"
            }
        },
        {
            "type": "text",
            "order_index": 1,
            "config": {
                "label": "Subtitle",
                "placeholder": "Enter subtitle"
            }
        },
        {
            "type": "image",
            "order_index": 2,
            "config": {
                "label": "Image"
            }
        },
        {
            "type": "link",
            "order_index": 3,
            "config": {
                "label": "cta1",
            }
        },
        {
            "type": "link",
            "order_index": 4,
            "config": {
                "label": "cta2",
            }
        }
    ]'
  );

  SELECT * from slices;