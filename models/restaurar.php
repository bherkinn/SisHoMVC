<?php 
	require_once("conexion.php");

	Class Restaurar extends Conexion{

		public function cboDocentes()
	    {
	        
	        $this->conectar(2);
	        $this->memoria = $this->con2->query("SELECT codDocente,apePaterno,apeMaterno,nombres from docentes");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

		public function Recuperar(){

	        $this->Open(1);
	        
	        $sql = "SELECT * FROM basehorarios WHERE estado=0 ORDER BY fecha DESC";
	        
	        $this->memoria = $this->con1->query($sql);
	        
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            
	            return $datos;
	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function Borrar($id, $estado)
	    {
	        $this->Open(1);
	        $this->con1->query("UPDATE basehorarios SET estado=$estado WHERE idHorarios=$id");
	    }

	}
?>