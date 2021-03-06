# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Page.destroy_all

Page.create(image_url: "./images/2.png", top_text: 'Khrrrrrr....."Oh no," wails Shyam.', bottom_text: 'The seams of his favorite shirt have come apart. "I can\'t wear this shirt anymore, Thatha!"')
Page.create(image_url: "./images/3.png", top_text: '"Of course you can, silly," his grandfather says. "We can repair it!"', bottom_text: 'Thatha takes a needle and a spool of blue thread. He shows Shyam how to stitch the seams together.')
Page.create(image_url: "./images/4.png", top_text: 'Shyam\'s friend Shrisha has come home. "Let\'s go cycling," she says. "In a minute," says Shyam. "Let me iron my shirt first." He switched on the iron box. But the light doesn\'t glow, and the iron remains cold. "Ufff! I\'ll just wear the crumpled shirt." grumbles Shyam.', bottom_text: '"I was at the Repair Mela last week," says Shrisha. "George Uncle, who teaches chemistry in my brothe\'s college, was repairing an iron box. I watched what he was doing very closely. let\'s try to set it right! Do you have a screwdriver?')
Page.create(image_url: "./images/5.png", top_text: 'Shyam hunts in the cupboard and gets a screwdriver. Shrisha unscrews the back of the iron.', bottom_text: '"See this wire? When you switch on the power, electric current passes through it and heats up the iron plate. This process is called conduction," says Shrisha.')
Page.create(image_url: "./images/6.png", top_text: '"And this small thing is the thermostat. It makes sure that the iron doesn\'t get too hot. If the heat goes way up, it just cuts off the power...', bottom_text: '"...The red light goes out. When the iron cools down, the current flows again and the light comes on."')
Page.create(image_url: "./images/7.png", top_text: '"Other heating devices must work the same way, right? Geysers, kettles, ovens?"', bottom_text: 'But Shrisha is not listening. She\'s peering into the iron.')
Page.create(image_url: "./images/8.png", top_text: '"What\'s wrong?" asks Shyam. "I don\'t think I can repair it." "Oh no! Appa and Amma will scold us when see what we have done to the iron box!"',  bottom_text: '"We\'ll take it to the Repair Mela! They\'ll help us."')
Page.create(image_url: "./images/9.png", top_text: 'Before Shyam\'s parents can ask them about the iron box,', bottom_text: 'He and Shrisha take it and sneak out on their cycles to the Repair Mela.')
Page.create(image_url: "./images/10.png", top_text: '"Aunty, can you help us repair this iron box?" Shrisha asks Anupama Aunty. "What\'s wrong with it?" "It won\'t switch on!" says Shrisha.', bottom_text: 'Anupama Aunty takes out a little box with wires and knobs. "This is a multimeter," she says. "It checks if all parts of the iron are allowing electric current to flow. Let\'s start wth the plug."')
Page.create(image_url: "./images/11.png", top_text: 'Next, she tests all the other parts, until she comes to a small wire.', bottom_text: '" See this wire next to the plug? It\'s broken, even though it doesn\'t look damaged-there\'s your problem!"')
Page.create(image_url: './images/12.png',
         top_text: 'She cuts out the old wire and plug, and fixes a new wire and plug to the iron box.',
         bottom_text: '"Let\'s test it." She switches it on, and the light glows.')
Page.create(image_url: './images/13.png',
         top_text: "",
         bottom_text: 'After helping out at the mela and observing repairs for a while, they decide to head home.')
Page.create(image_url: './images/14.png',
         top_text: '"Oh no, the rear tyre has a puncture. Let\'s take it to the Manigandan Anna!" says Shrisha.',
         bottom_text: '"Puncture? No problem," says Manigandan Anna, who has a small cycle repair shop in the neighbourhood. He has been invited to the Repair Mela.')
Page.create(image_url: './images/15.png',
         top_text: 'He turns the cycle upside down. He takes a pair of tyre levers and pries the tyre away from the metal rim. Soon the inner tube is out.',
         bottom_text: '"Can you see a hole anywhere?" Anna asks the children. They can\'t. "Then how do you tell where the puncture is?" he asks. The children look at him cluelessly.')
Page.create(image_url: './images/16.png',
         top_text: "He immerses the tube, part by part, in a tub half-filled with water. At one point, they see small bubbles rising. \"See? That's where the hole is!\"",
         bottom_text: 'He cuts a small piece of rubber from an old tube. After rubbing the surface of the tube around the hole with sandpaper, he applies a rubber adhesive to the tube and the piece of rubber.')
Page.create(image_url: './images/17.png',
         top_text: '"Come, seal this," he says. Shyam puts the piece of rubber on the hole and presses it down.',
         bottom_text: '"If not for the professionals who fix cycles, umbrellas, footwear and other things, we would have mountains of waste all over!" says Shyam.')
Page.create(image_url: './images/18.png',
         top_text: 'The tyre is fixed, the iron is fixed, and Shrisha and Shyam ride back home.',
         bottom_text: 'It is a day well spent!')
Page.create(image_url: './images/19.png',
         top_text: 'There is an urgent need to decrease the amount of non-biodegradable waste that humans generate. Repair encourages a more efficient use of resources than the take, make and waste culture that is replacing our traditional way of make, preserve and reuse.',
         bottom_text: "Don't throw it. Fix it")
Page.create(image_url: './images/20.png',
         top_text: 'Raw materials used in products often need a lot of energy to be mined and processed to make them usable by manufacturers. The process of repair helps conserve these resources and extends the life of the product.',
         bottom_text: 'Only when something cannot be repaired should you think of recycling it.')
Page.create(image_url: './images/21.png',
         top_text: 'The Tradition of recycling',
         bottom_text: 'In India, we have a strong tradition of recycling, whether it is organic waste like food or inorganic waste like clothes. While their nmbers have reduced greatly, we still find kabadiwalas who collect old newspaper and recyclable household metal and plastic waste, and street peddlers who taske in your old clothes in return for new steel utensils.')
Page.create(image_url: './images/22.png',
         top_text: 'Have you used any of these tools?',
         bottom_text: 'If not, get someone to teach you to use them. This is a very useful skill to have.')
