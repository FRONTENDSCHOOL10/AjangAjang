/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8hlnndlejszxifv")

  // remove
  collection.schema.removeField("vjhxz8yq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rs1xmdge",
    "name": "cost",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3rmspuyy",
    "name": "sale",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9me0hyyw",
    "name": "badge",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "Karly Only",
        "한정수량",
        "희소가치 프로젝트"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ht0boa6",
    "name": "early_delivery",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zyvenkku",
    "name": "seller",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oeicpz6p",
    "name": "packaging",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fyulp2dg",
    "name": "unit",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8kepgt6l",
    "name": "weight_capacity",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vry8buyt",
    "name": "made_in",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cucjzbbj",
    "name": "allergy",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8hlnndlejszxifv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjhxz8yq",
    "name": "text",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("rs1xmdge")

  // remove
  collection.schema.removeField("3rmspuyy")

  // remove
  collection.schema.removeField("9me0hyyw")

  // remove
  collection.schema.removeField("5ht0boa6")

  // remove
  collection.schema.removeField("zyvenkku")

  // remove
  collection.schema.removeField("oeicpz6p")

  // remove
  collection.schema.removeField("fyulp2dg")

  // remove
  collection.schema.removeField("8kepgt6l")

  // remove
  collection.schema.removeField("vry8buyt")

  // remove
  collection.schema.removeField("cucjzbbj")

  return dao.saveCollection(collection)
})
