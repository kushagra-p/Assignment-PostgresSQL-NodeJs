import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sales_Record_Entity {
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Column({ type: 'text',default:null })
  region: string;

  @Column({ type: 'text',default:null })
  country: string;

  @Column({ type: 'text',default:null })
  itemType: string;

  @Column({ type: 'text',default:null })
  salesChannel: string;

  @Column({ type: 'text',default:null })
  orderPriority: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'text',default:null })
  orderId: string;
 
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  shipDate: Date;

  @Column({ type: 'text',default:null })
  unitSold: string;

  @Column({ type: 'text',default:null })
  unitPrice: string;

  @Column({ type: 'text',default:null })
  unitCost: string;

  @Column({ type: 'text',default:null })
  totalRevenue: string;

  @Column({ type: 'text',default:null })
  totalCost: string;

  @Column({ type: 'text',default:null })
  totalProfit: string;
}