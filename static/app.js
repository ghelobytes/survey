Ext.define('Wizard', {
	
	alias: 'widget.wizard',
	extend: 'Ext.tab.Panel',
	initComponent: function(){
		
		//this.buttons = this.createNavButtons();
		this.callParent(arguments);
		
		this.init();

	},
	autoScroll: true,
	tabPosition: 'left',
	tabRotation: 0,

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

	defaults: {
		tabConfig: {
			width: 200,
			height: 60
		},
		padding: '20 0 20 20',
		overflowY: 'scroll'
	},
	items: [
		{
			title: 'Grantee Information',
			items: [
			
			
				// GRANTEE DETAILS
				{
					xtype: 'panel',
					title: 'Grantee details',
					layout: 'anchor',
					collapsible: true,
					collapsed: false,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items:[
	
						// GRANTEE
						{
							xtype: 'textfield',
							itemId: 'txtGrantee',
							fieldLabel: 'CCT Grantee',
							emptyText: 'Jose P. Rizal'
						},
						// A.K.A
						{
							xtype: 'textfield',
							fieldLabel: 'A.K.A',
							emptyText: 'Pepe'
						},
						// TOWN
						{
							xtype: 'combo',
							itemId: 'cmbTown',
							fieldLabel: 'Town',
							editable: false,
							store: [],
							listeners: {
								select: function(){
									var me = this.up('wizard');
									var cmbBarangay = me.down('#cmbBarangay');
									var cmbPurok = me.down('#cmbPurok');
									cmbBarangay.clearValue();
									cmbPurok.clearValue();
									cmbBarangay.setStore(me.getLocations(this.getValue()));
								}
							}
						},
						// BARANGAY
						{
							xtype: 'combo',
							itemId: 'cmbBarangay',
							fieldLabel: 'Barangay',
							editable: false,
							store: [],
							listeners: {
								select: function(){
									var me = this.up('wizard');
									var cmbTown = me.down('#cmbTown');
									var cmbPurok = me.down('#cmbPurok');
									cmbPurok.clearValue();
									cmbPurok.setStore(me.getLocations(cmbTown.getValue(),this.getValue()));
								}
							}
						},
						// PUROK
						{
							xtype: 'combo',
							itemId: 'cmbPurok',
							fieldLabel: 'Purok',
							editable: false,
							store: []
						}

	
	
					]
				},
			
				// INTERVIEW DETAILS
				{
					xtype: 'panel',
					title: 'Interview details',
					layout: 'anchor',
					collapsible: true,
					collapsed: false,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%',
						labelWidth: 130
					},
					items:[
		
						// INTERVIEWEE
						{
							xtype: 'textfield',
							itemId: 'txtInterviewee',
							fieldLabel: 'Interviewee',
							emptyText: 'Francisco R. Mercado',
							listeners: {
								blur: function(){
									var me = this.up('wizard');
									var cmbRelationship = me.down('#cmbRelationship');
									var txtGrantee = me.down('#txtGrantee');
									cmbRelationship.emptyText = 'relationship of ' + this.getValue() + ' to ' + txtGrantee.getValue();
									cmbRelationship.applyEmptyText();
								}
							}
						},
						// RELATIONSHIP
						{
							xtype: 'combo',
							itemId: 'cmbRelationship',
							fieldLabel: 'Relationship',
							emptyText: 'relationship of interviewee to grantee',
							store: ['Spouse','Father','Mother','Sister','Brother','Child','Cousin','Neighbor','Uncle','Auntie','Nephew'],
							flex: 2
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
							
								// DATE OF INTERVIEW
								{
									xtype: 'datefield',
									fieldLabel: 'Date of interview',
									labelWidth: 130,
									width: 300,
									value: new Date(),
									flex: 1
								},
								// TIME START
								{
									xtype: 'timefield',
									increment: 15,
									fieldLabel: 'Time start',
									padding: '0 0 0 15',
									value: new Date(),
									labelWidth: 80,
									flex: 1
								},
								// TIME END
								{
									xtype: 'timefield',
									increment: 15,
									fieldLabel: 'Time End',
									padding: '0 0 0 15',
									value: new Date(),
									labelWidth: 80,
									flex: 1
								}
							
							
							]
						}

		
		
					]
				},

			
			
			
			
			
			
			
				// IDENTIFICATIONS
				{
					xtype: 'panel',
					title: 'Interview',
					layout: 'anchor',
					collapsible: true,
					collapsed: true,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items:[
			
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
								// NAMRIA ID
								{
									xtype: 'textfield',
									fieldLabel: 'NAMRIA ID',
									flex: 1
								},
								// TIN
								{
									xtype: 'textfield',
									fieldLabel: 'TIN',
									padding: '0 0 0 10',
									flex: 1
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
								// GSIS
								{
									xtype: 'textfield',
									fieldLabel: 'GSIS ID',
									flex: 1
								},
								// PAG-IBIG
								{
									xtype: 'textfield',
									fieldLabel: 'PAG-IBIG ID',
									padding: '0 0 0 10',
									flex: 1
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
								// PHILHEALTH
								{
									xtype: 'textfield',
									fieldLabel: 'PHILHEALTH',
									flex: 1
								},
								// SSS
								{
									xtype: 'textfield',
									fieldLabel: 'SSS ID',
									padding: '0 0 0 10',
									flex: 1
								}
							]
						}
			
					]
				},
				
				// RESIDENTIAL
				{
					xtype: 'panel',
					title: 'Residential address',
					layout: 'form',
					collapsible: true,
					collapsed: true,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items: [
						// ADDRESS
						{
							xtype: 'textarea',
							fieldLabel: 'Address',
							emptyText: 'house no., building, street, barangay, municipality, district, province',
							width: '100%'
						},
						// ZIP CODE
						{
							xtype: 'textfield',
							fieldLabel: 'Zip code',
							padding: '0 0 0 10'
						},
						// TELEPHONE
						{
							xtype: 'textfield',
							fieldLabel: 'Telephone',
							padding: '0 0 0 10'
						}
					
					]
				},
				// PERMANENT
				{
					xtype: 'panel',
					title: 'Permanent address',
					layout: 'form',
					collapsible: true,
					collapsed: true,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items: [
						// ADDRESS
						{
							xtype: 'textarea',
							fieldLabel: 'Address',
							emptyText: 'house no., building, street, barangay, municipality, district, province',
							width: '100%'
						},
						// ZIP CODE
						{
							xtype: 'textfield',
							fieldLabel: 'Zip code',
							padding: '0 0 0 10'
						},
						// TELEPHONE
						{
							xtype: 'textfield',
							fieldLabel: 'Telephone',
							padding: '0 0 0 10'
						}
					
					]
				}
			
			
			]
		},
		{
			title: 'Family Background',
			items: [
				// SPOUSE
				{
					xtype: 'panel',
					title: 'Spouse',
					layout: 'anchor',
					collapsible: true,
					collapsed: false,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items: [
						// SURNAME
						{
							xtype: 'textfield',
							fieldLabel: 'Surname'
						},
						// FIRST NAME
						{
							xtype: 'textfield',
							fieldLabel: 'First name'
						},
						// MIDDLE NAME
						{
							xtype: 'textfield',
							fieldLabel: 'Middle name'
						},
						// OCCUPATION
						{
							xtype: 'textfield',
							fieldLabel: 'Occupation'
						},
						// EMPLOYER/BUSINESS
						{
							xtype: 'textfield',
							fieldLabel: 'Employer',
							emptyText: '(enter business name if self employed)'
						}
					]
				},
				// CHILDREN
				{
					xtype: 'grid',
					collapsible: true,
					collapsed: true,
					margin: '20 40 20 20',
				    title: 'Children',
					store: {
						xtype: 'store',
					    fields:['name', 'email', 'phone'],
					    data: { 
							items: [
								{name: 'Sophia Isabel M. Arboleda', dob: '11/08/2010'},
								{name: 'Damien Angelo M. Arboleda', dob: '08/27/2012'},
							]
					        
					    },
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					},
					columns: [
				        { text: 'NAME OF CHILD',  dataIndex: 'name', flex: 2},
				        { text: 'DATE OF BIRTH', dataIndex: 'dob', flex: 1 }
				    ],
					buttons: [
						{
							text: 'add'
						},
						{
							text: 'remove'
						}
					]
				}
			]
		},
		{
			title: 'Educational Background'
		},
		{
			title: 'Civil Service Eligibility'
		},
		{
			title: 'Work Experience'
		},
		{
			title: 'Voluntary Work'
		},
		{
			title: 'Training Programs'
		},
		{
			title: 'Other Information'
		}
		
	],
	
	init: function(){

		var cmbTown = this.down('#cmbTown');
		cmbTown.setStore(this.getLocations());

		
		
	},
	
	createNavButtons: function(){
		var me = this;
		return [
			{
				text: 'Previous',
				itemId: 'prev',
				listeners: {
					click: {
						fn: this.buttonHandler,
						scope: me
					}
				},
				disabled: true
			},
			{
				text: 'Next',
				itemId: 'next',
				listeners: {
					click: {
						fn: this.buttonHandler,
						scope: me
					}
				}
			},
		
		];
	},
	buttonHandler: function(btn){
		
		var active = this.getLayout().getActiveItem();
		var index = this.items.indexOf(active);
		
		if(btn.text == 'Next'){
			index = (index==this.items.length-1 ? this.items.length-1 : index+1);
			this.getLayout().setActiveItem(index);	
		}
		
		if(btn.text == 'Previous'){
			index = (index==0 ? 0 : index-1);
			this.getLayout().setActiveItem(index);
		}
		

		// enable disable buttons
		var prev = this.down('#prev');
		var next = this.down('#next');
		
		prev.setDisabled(index==0);
		next.setDisabled(index==this.items.length-1);
		
		//prev.setHidden(index==0);
		//next.setHidden(index==this.items.length-1);

	},
	
	
	getLocations: function(town, barangay){
		var obj; 
		var list = [];
		if(town && barangay){
			obj = this.locations[town][barangay];
		} else if(town){
			obj = this.locations[town];
		} else {
			obj = this.locations;
		}
		
		for(i in obj){
			list.push(i);
		}
		return list;

	},
	
	locations: {
		"Town 1": {
			"Barangay 1.1": {
				"Purok 1.1.1": {},
				"Purok 1.1.2": {},
				"Purok 1.1.3": {}
			},
			"Barangay 1.2": {
				"Purok 1.2.1": {},
				"Purok 1.2.2": {},
				"Purok 1.2.3": {}
			},
		},
		"Town 2": {
			"Barangay 2.1": {
				"Purok 2.1.1": {},
				"Purok 2.1.2": {},
				"Purok 2.1.3": {}
			},
			"Barangay 2.2": {
				"Purok 2.2.1": {},
				"Purok 2.2.2": {},
				"Purok 2.2.3": {}
			},
		}
		
	}
	

});



Ext.onReady(function () {
	

	
	Ext.create('Ext.container.Viewport', {
		id: 'viewport',
	    layout: 'fit',
		items: {
			xtype: 'wizard',
			title: 'Survey Form'
		}
		
	});
	
});
